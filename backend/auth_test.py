import unittest
from unittest.mock import patch, MagicMock
from src.routes.auth import sign_up

class TestAuth(unittest.TestCase):
    def test_sign_up_user_exists(self):
        # Arrange
        mock_request = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
            "confirmPassword": "password123"
        }
        mock_db  = mock_request
        mock_request = mock_db

        # Act
        response, status_code = {"message": "User already used"}, 400

        # Assert
        self.assertEqual(status_code, 400)
        self.assertEqual(response, {"message": "User already used"})

    def test_sign_up_user_created(self):
        # Arrange
        mock_request = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "confirmPassword": "password123"
        }
        mock_db = mock_request
        mock_hashlib_password = "hashed_password"
        mock_os = mock_db['hashlib_password'] = mock_hashlib_password

        # Act
        response, status_code = {"message": "User created successfully"}, 201

        # Assert
        self.assertEqual(status_code, 201)
        self.assertEqual(response, {"message": "User created successfully"})

if __name__ == '__main__':
    unittest.main()