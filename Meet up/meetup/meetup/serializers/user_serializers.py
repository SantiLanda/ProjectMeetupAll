from rest_framework import serializers
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'first_name']
        extra_kwargs = {
            'username': {'required': False, 'allow_blank': True},  # Make username optional
        }

    def validate_email(self, value):
        """
        Check if the email is already in use.
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def create(self, validated_data):
        """
        Create user and hash the password.
        """
        validated_data['username'] = validated_data.get('email', '')  # Set username to email if not provided
        user = User.objects.create(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user
