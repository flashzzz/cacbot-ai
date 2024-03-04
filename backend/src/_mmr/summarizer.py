import os
import collections
import re
import en_core_web_sm
from preprocess import *


class MMR(object):
    """A summarizer implementing the Maximal Marginal Relevence (MMR) summarization algorithm (Carbonell & Goldstein, 1998)."""
    def __init__(self):
        """
        MMR default constructor. MMR is a simple query-based, multi-document summarization algorithm.
        """
        self.__nlp = en_core_web_sm.load()


    def summarize(self, document_set, query, summary_file=None, max_length=10, lda=0.9):
        """
        Generates a summary of the documents in a set with respect to a particular query.
        :param document_set: set of documents to be summarized.
        :type document_set: list(list(str))
        :param query: query about the set of documents.
        :type query: str
        :param summary_file: path of a file where to output the candidate summary. If None is provided then no file is created or updated.
        :type summary_file: Path
        :param max_length: Maximum number of words that the summary cans include.
        :type max_length: int
        :param lda: lambda parameter used in computation of MMR score.
        :type lda: float
        :return: the candidate summary
        :rtype: list(str)
        """

        query = self.Sentence(query)


        complete_set = set()
        for document in document_set:
            preproc_doc = []
            for sentence in document:
                preproc_doc.append(self.Sentence(sentence))
            complete_set = complete_set.union(set(preproc_doc))

        selected = collections.OrderedDict()
        summary_len = 0
        while set(selected) != complete_set and summary_len < max_length:
            remaining = complete_set - set(selected)
            mmr_score = lambda x: lda*self.__similarity(x.preproc_text, query.preproc_text) - (1-lda)*max([self.__similarity(x.preproc_text, y.preproc_text) for y in set(selected)-{x}], default=0)
            next_selected = max(remaining, key=mmr_score) #self.__argmax(remaining, mmr_score)
            summary_len += self.__count_words(next_selected.original_text)
            selected[next_selected] = len(selected)

        if summary_file:
            os.makedirs(os.path.dirname(str(summary_file)), exist_ok=True)
            with open(str(summary_file), 'w', encoding='utf-8-sig') as f:
                f.write(" ".join(selected))

        summary = []
        for sentence in list(selected):
            summary.append(sentence.original_text)
        return summary


    def __similarity(self, sent_1, sent_2):
        """
        Compute similarity score between two sentences.
        :param sent_1: the first sentence.
        :type sent_1: str
        :param sent_2: the second sentence.
        :type sent_2: str
        :return: similarity score, in [0,1], where 1 == perfect similarity.
        :rtype: float
        """
        sent_1 = self.__nlp(sent_1)
        sent_2 = self.__nlp(sent_2)
        return sent_1.similarity(sent_2)


    def __count_words(self, sentence):
        """
        Compute the number of words in a sentence.
        :param sentence: a sentence.
        :type sentence: str
        :return: number of words in the sentence
        :rtype: int
        """
        return len(re.sub(r"[^\w]", " ",  sentence).split())


    class Sentence(object):
        """A pre-processed string and its orignal form."""

        def __init__(self, text):
            """
            Sentence constructor.
            """
            self.original_text = text
            self.preproc_text = self.preproc(text)

        def preproc(self, text):
            """
            Processes a string for improved similarity evaluation.
            :param text: the string to be processed.
            :type text: str
            :return: a string free of special characters and digit where all words are stems
            :rtype: str
            """
            lowercase_text = lowercase(text)
            filtered_chars = remove_special_chars_from(lowercase_text)
            filtered_digits = remove_digits_from(filtered_chars)
            word_list = tokenize(filtered_digits)
            filtered_words = remove_stopwords_from(word_list)
            stems = stem(filtered_words)
            preproc_sentence = " ".join(stems)
            return preproc_sentence