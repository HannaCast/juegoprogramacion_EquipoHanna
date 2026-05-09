from django.urls import path

from .views import QuestionDetailView, QuestionListView, StatusView, ValidateAnswerView

urlpatterns = [
    path("status/", StatusView.as_view(), name="status"),
    path("questions/", QuestionListView.as_view(), name="question-list"),
    path("questions/<int:pk>/", QuestionDetailView.as_view(), name="question-detail"),
    path("validate/", ValidateAnswerView.as_view(), name="validate-answer"),
]
