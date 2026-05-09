from django.core.management.base import BaseCommand

from quiz.models import Question


QUESTIONS = [
    {
        "level": 1,
        "text": "Que hace la funcion print en Python?",
        "options": [
            "Imprime texto en consola",
            "Declara una variable",
            "Crea una lista",
            "Termina el programa",
        ],
        "correct_index": 0,
    },
    {
        "level": 2,
        "text": "Cual es la salida de len([1, 2, 3])?",
        "options": ["1", "2", "3", "Error"],
        "correct_index": 2,
    },
    {
        "level": 3,
        "text": "Que significa HTML?",
        "options": [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperTool Multi Language",
            "Home Tool Markup Language",
        ],
        "correct_index": 0,
    },
    {
        "level": 4,
        "text": "Cual palabra clave se usa para definir una funcion en Python?",
        "options": ["func", "def", "function", "lambda"],
        "correct_index": 1,
    },
    {
        "level": 5,
        "text": "Que operador se usa para comparar igualdad en JavaScript?",
        "options": ["=", "==", "=>", "!="],
        "correct_index": 1,
    },
    {
        "level": 6,
        "text": "Cual es el resultado de 5 % 2?",
        "options": ["0", "1", "2", "3"],
        "correct_index": 1,
    },
    {
        "level": 7,
        "text": "Que estructura repite un bloque mientras una condicion sea verdadera?",
        "options": ["if", "for", "while", "switch"],
        "correct_index": 2,
    },
    {
        "level": 8,
        "text": "Cual es el tipo de dato de True en Python?",
        "options": ["int", "str", "bool", "list"],
        "correct_index": 2,
    },
    {
        "level": 9,
        "text": "Que hace CSS?",
        "options": [
            "Define la estructura de la pagina",
            "Define el estilo visual",
            "Gestiona la base de datos",
            "Compila el codigo",
        ],
        "correct_index": 1,
    },
    {
        "level": 10,
        "text": "Cual es la salida de 2 ** 3 en Python?",
        "options": ["5", "6", "8", "9"],
        "correct_index": 2,
    },
    {
        "level": 11,
        "text": "Que palabra clave se usa para retornar un valor?",
        "options": ["return", "break", "yield", "stop"],
        "correct_index": 0,
    },
    {
        "level": 12,
        "text": "Que metodo agrega un elemento al final de un array en JS?",
        "options": ["push", "pop", "shift", "slice"],
        "correct_index": 0,
    },
]


class Command(BaseCommand):
    help = "Seed initial programming questions."

    def handle(self, *args, **options):
        created = 0
        for item in QUESTIONS:
            _, was_created = Question.objects.get_or_create(
                level=item["level"],
                text=item["text"],
                defaults={
                    "options": item["options"],
                    "correct_index": item["correct_index"],
                },
            )
            if was_created:
                created += 1
        self.stdout.write(self.style.SUCCESS(f"Seed completed. Added: {created}"))
