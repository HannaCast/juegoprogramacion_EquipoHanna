from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Question
from .serializers import AnswerCheckSerializer, QuestionPublicSerializer


class StatusView(APIView):
	def get(self, request):
		return Response({"status": "ok"})


class QuestionListView(ListAPIView):
	serializer_class = QuestionPublicSerializer

	def get_queryset(self):
		queryset = Question.objects.all()
		level = self.request.query_params.get("level")
		if level:
			try:
				level_value = int(level)
			except ValueError:
				return Question.objects.none()
			queryset = queryset.filter(level=level_value)
		return queryset


class QuestionDetailView(RetrieveAPIView):
	serializer_class = QuestionPublicSerializer
	queryset = Question.objects.all()


class ValidateAnswerView(APIView):
	def post(self, request):
		serializer = AnswerCheckSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		question_id = serializer.validated_data["question_id"]
		selected_index = serializer.validated_data["selected_index"]

		question = get_object_or_404(Question, pk=question_id)
		is_correct = selected_index == question.correct_index
		return Response({"correct": is_correct}, status=status.HTTP_200_OK)
