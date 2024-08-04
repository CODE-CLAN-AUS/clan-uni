import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Client, query as q } from 'faunadb';
import type IRating from "../../types/IRating";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const data: IRating = JSON.parse(event.body || '{}');
  const { fingerprint, url } = data;

  const client = new Client({
    secret: process.env.FAUNADB_SECRET as string
  });

  try {
    const matchCondition = q.Match(
      q.Index('unique_fingerprint_url'), [fingerprint, url]
    );

    const document = await client.query(
      q.Let(
        {
          match: q.If(
            q.Exists(matchCondition),
            q.Get(matchCondition),
            null
          ),
          ratingsPage: q.Paginate(q.Match(q.Index('all_by_url'), url), { size: 100000 }), // Increase size if needed
          ratings: q.Select(["data"], q.Map(
            q.Var('ratingsPage'),
            q.Lambda('X', q.Select(['data', 'rating'], q.Get(q.Var('X'))))
          )),
          totalRatings: q.Sum(q.Var('ratings')),
          count: q.Count(q.Var('ratings')),
          ratingCounts: q.Reduce(
            q.Lambda(['acc', 'rating'],
              q.Merge(q.Var('acc'), { [q.Var('rating')]: q.Add(q.Select(q.Var('rating'), q.Var('acc'), 0), 1) })
            ),
            { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            q.Var('ratings')
          )
        },
        {
          count: q.Var('count'),
          averageRating: q.If(
            q.Equals(q.Var('count'), 0),
            0,
            q.Divide(q.Var('totalRatings'), q.Var('count'))
          ),
          ratingCounts: q.Var('ratingCounts'),
          document: q.Var('match')
        }
      )
    );

    return {
      statusCode: 200,
      body: JSON.stringify(document)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve comment data.' })
    };
  }
};

export { handler };