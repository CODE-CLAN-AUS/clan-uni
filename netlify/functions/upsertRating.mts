import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Client, query as q } from 'faunadb';
import type IRating from "../../src/interfaces/IRating"

const client = new Client({
  secret: process.env.FAUNADB_SECRET as string
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const data: IRating = JSON.parse(event.body || '{}');
  const { fingerprint, url, rating } = data;

  try {
    const matchCondition = q.Match(
      q.Index('unique_fingerprint_url'), [fingerprint, url]
    );

    const exists = await client.query(
      q.Exists(matchCondition)
    );

    let result;
    if (exists) {
      const documentRef = await client.query(
        q.Select(['ref'], q.Get(matchCondition))
      );

      result = await client.query(
        q.Update(documentRef, {
          data: { rating, updatedAt: new Date() }
        })
      );
    } else {
      result = await client.query(
        q.Create(q.Collection('Ratings'), {
          data: { fingerprint, url, rating, createdAt: new Date() }
        })
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    };
  }
};

export { handler };