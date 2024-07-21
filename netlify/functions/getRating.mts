import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Client, query as q } from 'faunadb';
import type IRating from "../../src/interfaces/IRating"

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
          ratings: q.Map(
            q.Paginate(q.Match(q.Index('all_by_url'), url)),
            q.Lambda('X', q.Select(['data', 'rating'], q.Get(q.Var('X'))))
          ),
          totalRatings: q.Sum(q.Var('ratings')),
          count: q.Count(q.Var('ratings'))
        },
        {
          count: q.Var('count'),
          averageRating: q.If(
            q.Equals(q.Var('count'), 0),
            0,
            q.Divide(q.Var('totalRatings'), q.Var('count'))
          ),
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
      body: JSON.stringify({ error })
    };
  }
};

export { handler };