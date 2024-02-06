import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "langchain/document";

interface UpsertMetaData {
  doc: Document<Record<string, any>>;
}

const embedQuery = async (query: string) => {
  const embeddings = new OpenAIEmbeddings({
    modelName: "text-embedding-3-large",
    openAIApiKey: "api_key",
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
      apiKey: "api_key",
    });

    this.index_name = user_id;
    console.log("User ID value set");
  };

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
    await index.upsert(records);
  };
}

const obj = new VectorStore("barryallen");
obj.initializeIndex()
  .then(() => {
    obj.upsert(["Jon Snow", "king in the North"]);
    console.log("Upserted");
  })
  .catch((error) => {
    console.error("Error during initialization:", error);
  });
