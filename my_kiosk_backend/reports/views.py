from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Request
from .serializers import RequestSerializer  # Create this serializer

@api_view(['POST'])
def submit_request(request):
    if request.method == 'POST':
        serializer = RequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
