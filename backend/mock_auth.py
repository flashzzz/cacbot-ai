import unittest
from unittest.mock import patch, MagicMock
from src.routes.auth import sign_up

class TestAuth(unittest.TestCase):
    @patch('src.auth.request')
    @patch('src.auth.db')
    def test_sign_up_user_exists(self, mock_db, mock_request):
        # Arrange
        mock_request.get_json.return_value = {
            "username": "testuser",
            "email": "testuser@example.com",
            "password": "password123",
            "confirmPassword": "password123"
        }
        mock_db.users.find_one.return_value = True

        # Act
        response, status_code = sign_up()

        # Assert
        self.assertEqual(status_code, 400)
        self.assertEqual(response.json, {"message": "User already used"})

    @patch('src.auth.request')
    @patch('src.auth.db')
    @patch('src.auth.hashlib_password')
    @patch('src.auth.os')
    def test_sign_up_user_created(self, mock_os, mock_hashlib_password, mock_db, mock_request):
        # Arrange
        mock_request.get_json.return_value = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "password123",
            "confirmPassword": "password123"
        }
        mock_db.users.find_one.return_value = None
        mock_hashlib_password.return_value = "hashed_password"
        mock_os.environ.get.return_value = "SALT"

        # Act
        response, status_code = sign_up()

        # Assert
        self.assertEqual(status_code, 201)
        self.assertEqual(response.json, {"message": "User created successfully"})
        mock_db.users.insert_one.assert_called_once()

if __name__ == '__main__':
    unittest.main()