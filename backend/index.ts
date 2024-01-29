import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { WebPDFLoader } from "langchain/document_loaders/web/pdf";
import { compile } from "html-to-text";
import { RecursiveUrlLoader } from "langchain/document_loaders/web/recursive_url";
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";

const options = {
    apiKey: "MY_API_KEY",
};

const PdfLoader = async (file: string) => {
  const loader = new PDFLoader(file);
  const dec = await loader.load();
  return dec;
};
const TxtLoader = async (file: string) => {
  const loader = new TextLoader(file);
  const dec = await loader.load();
  return dec;
};
const OnlinePdfLoader = async (file: string) => {
  const blob = new Blob(["https://arxiv.org/pdf/2401.14453.pdf"], { type: "application/pdf" });
  const loader = new UnstructuredLoader("./2401.14453.pdf");
  const dec = await loader.load();
  return dec;
};


const compiledConvert = compile({ wordwrap: 130 }); // returns (text: string) => string;
const url = "https://js.langchain.com/docs/get_started/introduction";
const UrlLoader = async (file: string) => {
  const loader = new RecursiveUrlLoader(url, {
    extractor: compiledConvert,
    maxDepth: 1,
    excludeDirs: ["https://js.langchain.com/docs/api/"],
  });
  const dec = await loader.load();
  return dec;
};

// const res = PdfLoader("./test.txt");
// const res = TxtLoader("./test.txt");
const res = OnlinePdfLoader("./test.pdf");
// const res = UrlLoader(url);
res.then((data) => {
  console.log(data);
});
// console.log("Hello from backend");
