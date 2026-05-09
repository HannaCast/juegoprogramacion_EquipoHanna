from django.db import models


class Question(models.Model):
	level = models.PositiveIntegerField()
	text = models.TextField()
	options = models.JSONField()
	correct_index = models.PositiveSmallIntegerField()
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		ordering = ["level", "id"]

	def __str__(self) -> str:
		return f"Nivel {self.level}: {self.text[:40]}"
