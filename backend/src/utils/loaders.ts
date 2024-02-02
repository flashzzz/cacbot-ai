import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { DOC_TYPES } from "../constants/enum";

const options = {
  apiKey: "MY_API_KEY",
};

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 100,
  lengthFunction: (text) => text.length,
});

const PdfLoader = async (file: string) => {
  const loader = new PDFLoader(file);
  const doc = await loader.loadAndSplit(splitter);
  return doc;
};
const TxtLoader = async (file: string) => {
  const loader = new TextLoader(file);
  const dec = await loader.loadAndSplit(splitter);
  return dec;
};

const OnlinePdfLoader = async (file: string) => {
  const blob = new Blob([file], {
    type: "application/pdf",
  });
  const loader = new UnstructuredLoader(file);
  const dec = await loader.loadAndSplit(splitter);
  return dec;
};

const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;

const UrlLoader = async (url: string) => {
  const loader = new RecursiveUrlLoader(url, {
    extractor: compiledConvert,
    maxDepth: 1,
  });
  const dec = await loader.loadAndSplit(splitter);
  return dec;
};

export const FinalLoad = async (uploads: [string, string][]) => {
  let docs = [];
  for (const upload of uploads) {
    const [file, doctype] = upload;
    if (doctype) {
      let doc: Document<Record<string, any>>[] = [];
      if (doctype === DOC_TYPES.PDF) {
        doc = await PdfLoader(file);
      } else if (doctype === DOC_TYPES.TXT) {
        doc = await TxtLoader(file);
      } else if (doctype === DOC_TYPES.ONLINE_PDF) {
        doc = await OnlinePdfLoader(file);
      } else if (doctype === DOC_TYPES.WEB_URL) {
        doc = await UrlLoader(file);
      }
      docs.push(...doc);
    }
  }

  return docs;
};

let array: [string, string][] = [];
array.push(["../../2401.14453.pdf", DOC_TYPES.PDF]);
array.push(["../../2401.14453.pdf", DOC_TYPES.PDF]);
const ans = FinalLoad(array);
ans.then((res) => {
  console.log(res.length);
});
