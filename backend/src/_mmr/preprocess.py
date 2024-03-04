import re
from nltk.corpus import stopwords
from string import digits
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer


def lowercase(text):
    """
    Returns the lowercased string from the given string.
    :param text: the string to be lowercased
    :type text: str
    :return: the lowercased string from the given string
    :rtype: str
    """
    return text.lower()


def tokenize(text):
    """
    Tokenizes a string to split off punctuation other than periods.
    :param text: the string to be tokenized
    :type text: str
    :return: a list of words and punctuation symbols other than periods
    :rtype: list(str)
    """
    return word_tokenize(text)


def remove_special_chars_from(text):
    """
    Filters out all non-alphanumerical characters.
    :param text: the string to be filtered
    :type text: str
    :return: a non-alphanumerical free version of the original string
    :rtype: str
    """
    return re.sub('[^A-Za-z0-9]+', ' ', text)


def remove_digits_from(text):
    """
    Filters out all digits (numerical) characters.
    :param text: the string to be filtered
    :type text: str
    :return: a digits free version of the original string
    :rtype: str
    """
    remove_digits = str.maketrans('', '', digits)
    return text.translate(remove_digits)


def remove_stopwords_from(word_list):
    """
    Filters out low-significance words.
    :param text: a list of words which might contain low-significance words
    :type text: list(str)
    :return: a list of words free of low-significance words
    :rtype: list(str)
    """
    return [word for word in word_list if word not in stopwords.words('english')]


def stem(word_list):
    """
    Tries to reduce inflectional forms and sometimes derivationally related forms of a list of words to a common base form.
    :param text: a list of words
    :type text: list(str)
    :return: a list of word stems
    :rtype: list(str)
    """
    stemmer = PorterStemmer()
    stems = []
    for word in word_list:
        stems.append(stemmer.stem(word))
    return stems
