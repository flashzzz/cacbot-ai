class DocumentHandlerError(Exception):
    def __init__(self, message)-> None:
        self.message = message

class ChatHandlerError(Exception):
    def __init__(self, message)-> None:
        self.message = message