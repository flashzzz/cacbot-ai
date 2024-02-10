import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";
import EventEmitter from "eventemitter3";

interface UpsertMetaData {
  doc: Document<Record<string, any>>;
}

const eventEmitter = new EventEmitter();

const embedQuery = async (query: string) => {
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-large",
    openAIApiKey: process.env.OPENAI_API_KEY as string,
  });
  const res = await embeddings.embedQuery(query as string);
  return res;
};

class VectorStore {
  private pc: Pinecone;
  private index_name: string;

  constructor(user_id: string) {
    // Initialize Pinecone and embedding model
    this.pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY as string,
    });

    this.index_name = user_id;
    console.log("User ID value set");
  }

  async initializeIndex() {
    try {
      await this.indexExists();
      console.log("Pinecone initialized");
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  }

  private async indexExists(): Promise<void> {
    const data = await this.pc.listIndexes();

    if (data.indexes && data.indexes.length > 0) {
      const isIndexPresent = data.indexes.find(
        (index) => index.name === this.index_name
      );

      if (!isIndexPresent) {
        await this.pc.createIndex({
          name: this.index_name,
          spec: {
            pod: {
              environment: "gcp-starter",
              podType: "p1.x1",
            },
          },
          dimension: 3072,
          metric: "cosine",
        });
        console.log("Index created");
      } else {
        console.log("Index already exists");
      }
    } else {
      await this.pc.createIndex({
        name: this.index_name,
        spec: {
          pod: {
            environment: "gcp-starter",
            podType: "p1.x1",
          },
        },
        dimension: 3072,
      });
      console.log("Index created");
    }
  }

  public async semanticSearch(userQuery: string) {
    const userQueryEmbedding = await embedQuery(userQuery);
    try {
      const index = this.pc.index("barryallen");
      console.log("Executing query with embedding:", userQueryEmbedding);
      let response;
      await index
        .query({
          topK: 3,
          vector: userQueryEmbedding,
          includeValues: true,
        })
        .then((res) => {
          response = res;
        });

      console.log("Querying Pinecone", response);
      return response;
    } catch (error) {
      console.error("Error during Pinecone query:", error);
      throw error;
    }
  }

  //   semantic_search(query, mmr = false, k = 5) {
  //     const vectorstore = new Pinecone({
  //       index_name: this.index_name,
  //       embedding_model: this.embedding_model,
  //     });

  //     let retrieved_chunks;
  //     if (mmr) {
  //       retrieved_chunks = vectorstore.max_marginal_relevance_search(
  //         query,
  //         k,
  //         10
  //       );
  //     } else {
  //       retrieved_chunks = vectorstore.similarity_search(query, k);
  //     }

  //     console.log(
  //       `Retrieved ${retrieved_chunks.length} documents from Pinecone for query: ${query}`
  //     );
  //     return retrieved_chunks;
  //   }

  //   upsert(docs) {
  //     const vectorstore = new Pinecone({
  //       index_name: this.index_name,
  //       embedding_model: this.embedding_model,
  //     });
  //     vectorstore.add_documents(docs);

  //     console.log(`Upserted ${docs.length} documents to Pinecone`);
  //   }

  public upsert = async (docs: string[]): Promise<void> => {
    // Specify a custom metadata type while targeting the index

    const index = this.pc.index("barryallen");

    // Now you get type errors if upserting malformed metadata
    let records = [];
    for (const doc of docs) {
      const embedding = await embedQuery(doc);
      const data = {
        id: doc,
        values: embedding,
      };
      records.push(data);
    }

    // Upsert a record in the default namespace
    const stats = await index.describeIndexStats();
    await index.upsert(records);
    const statsSecond = await index.describeIndexStats();
    console.log("Stats beforr", stats);
    console.log("Stats After",  statsSecond);
  };

  public deleteIndex = async () => {
    await this.pc.deleteIndex("barryallen");
  }
}

const obj = new VectorStore("barryallen");
obj
  .initializeIndex()
  .then(() => {
    obj
      .upsert([
        "Jon",
        "Bran",
        "Minato is God of Shinobi",
        // "The Northern lords declare Jon the new King in the North. Meanwhile, Bran Stark has a vision of the past which shows Ned reuniting with his dying sister Lyanna Stark in the Tower of Joy. She makes him swear to protect her son with Rhaegar Targaryen, who is revealed to be Jon.",
        // "When it comes to physical strength, there's no doubt that Naruto has surpassed the Fourth Hokage. Although Minato was quite powerful himself, he had his limits as a ninja. As the Nine-Tails Jinchuriki, Naruto had access to two types of chakra for most of his life which granted him increased durability and strength.",
      ])
      .then(() => {
        console.log("Upserted");
        obj
          .semanticSearch("Who is Minato?")
          .then((res) => {
            console.log("Semantic search result");
            console.log(res);
          })
          .catch((error) => {
            console.error("Error during search:", error);
          });
      })
      .catch((error) => {
        console.error("Error during upsert:", error);
      });
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
  });


// obj.semanticSearch("Who is Minato?").then((res) => {
//   console.log(res);
// }).catch((error) => {
//   console.error("Error during search:", error);
// });
