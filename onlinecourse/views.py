from django.shortcuts import render, get_object_or_404, redirect
from .models import Course, Question, Choice, Submission, Enrollment

def submit(request, course_id):
    course = get_object_or_404(Course, pk=course_id)
    if request.method == 'POST':
        enrollment = Enrollment.objects.get(user=request.user, course=course)
        submission = Submission.objects.create(enrollment=enrollment)
        for lesson in course.lesson_set.all():
            for question in lesson.question_set.all():
                selected_choice_ids = request.POST.getlist(f'choice_{question.id}')
                for choice_id in selected_choice_ids:
                    choice = Choice.objects.get(pk=choice_id)
                    submission.choices.add(choice)
        submission.save()
        return redirect('onlinecourse:show_exam_result', course_id=course.id, submission_id=submission.id)

def show_exam_result(request, course_id, submission_id):
    course = get_object_or_404(Course, pk=course_id)
    submission = get_object_or_404(Submission, pk=submission_id)
    total_score = 0
    user_score = 0
    for lesson in course.lesson_set.all():
        for question in lesson.question_set.all():
            total_score += question.grade
            selected_ids = submission.choices.filter(question=question).values_list('id', flat=True)
            if question.is_get_score(selected_ids):
                user_score += question.grade
    percentage = (user_score / total_score) * 100 if total_score > 0 else 0
    passed = percentage >= 70
    context = {
        'course': course,
        'submission': submission,
        'user_score': user_score,
        'total_score': total_score,
        'percentage': percentage,
        'passed': passed
    }
    return render(request, 'onlinecourse/exam_result.html', context)
