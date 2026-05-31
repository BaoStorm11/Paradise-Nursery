from django.contrib import admin
from .models import Course, Lesson, Instructor, Learner, Question, Choice, Submission

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 2

class QuestionAdmin(admin.ModelAdmin):
    fields = ['lesson', 'question_text', 'grade']
    inlines = [ChoiceInline]
    list_display = ['question_text', 'lesson', 'grade']

class LessonAdmin(admin.ModelAdmin):
    list_display = ['title']
    inlines = [QuestionInline]

admin.site.register(Course)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Instructor)
admin.site.register(Learner)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)
admin.site.register(Submission)
