const { randomUUID } = require("crypto");
    const { sliceIntoChunks } = require("./utils");

// Test edilecek değişkenin string olup olmadığını kontrol eden fonksiyon
function isString(test) {
  return typeof test === "string";
}

// CommonJS'te dinamik import kullanarak @xenova/transformers modülünü yükleme
async function createEmbedder(modelName) {
    const { pipeline, AutoConfig } = await import("@xenova/transformers");
    
    const config = await AutoConfig.from_pretrained(modelName);
    const pipe = await pipeline("embeddings", modelName, {
      quantized: false,
      config,
    });
  
    async function embed(text, metadata) {
      try {
        const result = await pipe(text, {
          pooling: "mean",
          normalize: true,
        });
        const id = (metadata?.id) || randomUUID();
        return {
          id,
          metadata: metadata || {
            text,
          },
          values: Array.from(result.data),
        };
      } catch (e) {
        console.log(`Error embedding text: ${text}, ${e}`);
        throw e;
      }
    }
  
    async function embedBatch(documents, batchSize, onDoneBatch) {
      const batches = sliceIntoChunks(documents, batchSize);
      for (const batch of batches) {
        const embeddings = await Promise.all(
          batch.map((documentOrString) =>
            isString(documentOrString)
              ? embed(documentOrString)
              : embed(documentOrString.pageContent, documentOrString.metadata)
          )
        );
        await onDoneBatch(embeddings);
      }
    }
  
    return {
      embed,
      embedBatch,
    };
  }
  
  module.exports = { createEmbedder };
  