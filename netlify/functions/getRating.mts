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
          ratingsPage: q.Paginate(q.Match(q.Index('ratings_by_url'), url)),
          ratings: q.Select(["data"], q.Map(
            q.Var('ratingsPage'),
            q.Lambda('X', q.Var('X'))
          )),
          totalRatings: q.Sum(q.Var('ratings')),
          count: q.Count(q.Var('ratings')),
          averageRating: q.If(
            q.Equals(q.Var('count'), 0),
            0,
            q.Divide(q.ToDouble(q.Var('totalRatings')), q.ToDouble(q.Var('count')))
          )
        },
        {
          count: q.Var('count'),
          averageRating: q.Var('averageRating'),
          ratings: q.Var('ratings'),
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
