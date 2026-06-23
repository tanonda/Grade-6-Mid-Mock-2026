(() => {
  const STORAGE_KEY = 'examRevision:topicProgress';
  const MOCK_KEY = 'examRevision:mockProgress';
  const KNOWN_KEY = 'examRevision:knownCards';
  const LESSON_KEY = 'examRevision:lessonsViewed';
  const VIDEO_KEY = 'examRevision:videosWatched';
  const QUIZ_RESULTS_KEY = 'examRevision:quizResults';
  const MOCK_HISTORY_KEY = 'examRevision:mockHistory';
  const COMPLETE_KEY = 'examRevision:completedTopics';

  const SUBJECT_COLORS = {
    'Maths':          '#5b8cff',
    'English':        '#ff7eb3',
    'Social Science': '#ffce5c',
    'Health':         '#20c997',
    'Science':        '#7c5cff',
  };

  const SUBJECT_EMOJI = {
    'Maths':          '\u2707', // ✇
    'English':        '\u270e', // ✎
    'Social Science': '\u25ce', // ◎
    'Health':         '\u271a', // ✚
    'Science':        '\u2728', // ✨
  };

  const els = {
    btnReset: document.getElementById('btnResetProgress'),
    topicProgressLine: document.getElementById('topicProgressLine'),
    mockProgressLine: document.getElementById('mockProgressLine'),
    // examples
    btnOpenExamples:  document.getElementById('btnOpenExamples'),
    btnBackHome:      document.getElementById('btnBackHome'),
    btnPrintBooklet:  document.getElementById('btnPrintBooklet'),
    examplesSearch:   document.getElementById('examplesSearch'),
    subjectTabs:      document.getElementById('subjectTabs'),
    examplesMeta:     document.getElementById('examplesMeta'),
    flashcardsGrid:   document.getElementById('flashcardsGrid'),
    examplesEmpty:    document.getElementById('examplesEmpty'),
    examplesStats:    document.getElementById('examplesStats'),
    examplesProgressLine: document.getElementById('examplesProgressLine'),
    printBooklet:     document.getElementById('printBooklet'),
    screenHome:       document.getElementById('screenHome'),
    screenProgress:   document.getElementById('screenProgress'),
    screenLessons:    document.getElementById('screenLessons'),
    screenExamples:   document.getElementById('screenExamples'),
    screenQuiz:       document.getElementById('screenQuiz'),
    btnOpenProgress:  document.getElementById('btnOpenProgress'),
    btnProgressBackHome: document.getElementById('btnProgressBackHome'),
    progressSummary:  document.getElementById('progressSummary'),
    progressSubjects: document.getElementById('progressSubjects'),
    progressRecent:   document.getElementById('progressRecent'),
    btnOpenLessons:   document.getElementById('btnOpenLessons'),
    btnLessonBackHome: document.getElementById('btnLessonBackHome'),
    lessonSubject:    document.getElementById('lessonSubject'),
    lessonTopic:      document.getElementById('lessonTopic'),
    lessonTopicList:  document.getElementById('lessonTopicList'),
    lessonTitle:      document.getElementById('lessonTitle'),
    lessonStatus:     document.getElementById('lessonStatus'),
    lessonBody:       document.getElementById('lessonBody'),
    lessonVisuals:    document.getElementById('lessonVisuals'),
    lessonVideo:      document.getElementById('lessonVideo'),
    lessonVideoNotes: document.getElementById('lessonVideoNotes'),
    lessonExamples:   document.getElementById('lessonExamples'),
    lessonResources:  document.getElementById('lessonResources'),
    btnMarkTopicComplete: document.getElementById('btnMarkTopicComplete'),
    btnLessonStartQuiz: document.getElementById('btnLessonStartQuiz'),
    selectSubject:    document.getElementById('selectSubject'),
    selectTopic:      document.getElementById('selectTopic'),
    btnStartTopic:    document.getElementById('btnStartTopic'),
    btnStartMock:     document.getElementById('btnStartMock'),
    mockScope:        document.getElementById('mockScope'),
    mockScopeHint:    document.getElementById('mockScopeHint'),
    mockMode:         document.getElementById('mockMode'),
    mockDuration:     document.getElementById('mockDuration'),
    mockCustomDurationRow: document.getElementById('mockCustomDurationRow'),
    mockCustomMinutes: document.getElementById('mockCustomMinutes'),
    topicQuizMode:    document.getElementById('topicQuizMode'),
    quizMode:         document.getElementById('quizMode'),
    mockTotalQuestions: document.getElementById('mockTotalQuestions'),
    btnQuitQuiz:      document.getElementById('btnQuitQuiz'),
    quizProgressText: document.getElementById('quizProgressText'),
    quizScoreText:    document.getElementById('quizScoreText'),
    quizTimerText:    document.getElementById('quizTimerText'),
    quizProgressBar:  document.getElementById('quizProgressBar'),
    quizPreTeach:     document.getElementById('quizPreTeach'),
    quizPreTeachKicker: document.getElementById('quizPreTeachKicker'),
    quizPreTeachTitle: document.getElementById('quizPreTeachTitle'),
    quizPreTeachLesson: document.getElementById('quizPreTeachLesson'),
    quizPreTeachVisuals: document.getElementById('quizPreTeachVisuals'),
    quizPreTeachExample: document.getElementById('quizPreTeachExample'),
    quizPreTeachExQ:  document.getElementById('quizPreTeachExQ'),
    quizPreTeachExA:  document.getElementById('quizPreTeachExA'),
    quizPreTeachExTip: document.getElementById('quizPreTeachExTip'),
    quizPreTeachVideo: document.getElementById('quizPreTeachVideo'),
    quizPreTeachVideoNotes: document.getElementById('quizPreTeachVideoNotes'),
    quizPreTeachResources: document.getElementById('quizPreTeachResources'),
    btnPreTeachStart: document.getElementById('btnPreTeachStart'),
    quizQuestionWrap: document.getElementById('quizQuestionWrap'),
    quizSubjectChip:  document.getElementById('quizSubjectChip'),
    quizTopicChip:    document.getElementById('quizTopicChip'),
    quizQuestion:     document.getElementById('quizQuestion'),
    quizOptions:      document.getElementById('quizOptions'),
    quizShortAnswerWrap: document.getElementById('quizShortAnswerWrap'),
    quizShortAnswer:  document.getElementById('quizShortAnswer'),
    btnSubmitShortAnswer: document.getElementById('btnSubmitShortAnswer'),
    quizFeedback:     document.getElementById('quizFeedback'),
    quizFeedbackIcon: document.getElementById('quizFeedbackIcon'),
    quizFeedbackTitle: document.getElementById('quizFeedbackTitle'),
    quizFeedbackAnswer: document.getElementById('quizFeedbackAnswer'),
    quizFeedbackTip:  document.getElementById('quizFeedbackTip'),
    btnNextQuestion:  document.getElementById('btnNextQuestion'),
    quizResult:       document.getElementById('quizResult'),
    quizResultTitle:  document.getElementById('quizResultTitle'),
    quizResultScore:  document.getElementById('quizResultScore'),
    quizResultMsg:    document.getElementById('quizResultMsg'),
    quizReview:       document.getElementById('quizReview'),
    btnQuizRetry:     document.getElementById('btnQuizRetry'),
    btnQuizHome:      document.getElementById('btnQuizHome'),
  };

  let lessonsData = null;
  let examplesData = null;
  let quizData = null;
  let resourcesData = null;
  let videosData = null;
  let visualAidsData = null;
  let videoNotesData = null;
  let activeSubject = 'All';
  let searchQuery = '';
  let quizState = null;
  let quizTimerId = null;
  let currentLessonSubject = '';
  let currentLessonTopic = '';

  /* ============ LOAD DATA ============ */
  async function loadLessons() {
    try {
      const response = await fetch('./lessons.json');
      lessonsData = await response.json();
    } catch (e) {
      lessonsData = { lessons: {} };
    }
  }

  async function loadExamples() {
    try {
      const response = await fetch('./worked-examples.json');
      examplesData = await response.json();
    } catch (e) {
      examplesData = { examples: {} };
    }
  }

  async function loadQuizQuestions() {
    try {
      const response = await fetch('./quiz-questions.json');
      quizData = await response.json();
    } catch (e) {
      quizData = { questions: {} };
    }
  }

  async function loadResources() {
    try {
      const response = await fetch('./tutorial-links.json');
      resourcesData = await response.json();
    } catch (e) {
      resourcesData = { resources: {} };
    }
  }

  async function loadVideos() {
    try {
      const response = await fetch('./video-tutorials.json');
      videosData = await response.json();
    } catch (e) {
      videosData = { videos: {} };
    }
  }

  async function loadVisualAids() {
    try {
      const response = await fetch('./visual-aids.json');
      visualAidsData = await response.json();
    } catch (e) {
      visualAidsData = { visuals: {} };
    }
  }

  async function loadVideoNotes() {
    try {
      const response = await fetch('./video-notes.json');
      videoNotesData = await response.json();
    } catch (e) {
      videoNotesData = { videos: {} };
    }
  }

  function getLesson(subject, topic) {
    if (!lessonsData?.lessons?.[subject]?.[topic]) return null;
    return lessonsData.lessons[subject][topic];
  }

  function getResources(subject, topic) {
    return resourcesData?.resources?.[subject]?.[topic] || [];
  }

  function getVideo(subject, topic) {
    const video = videosData?.videos?.[subject]?.[topic];
    return video ? { ...video, subject, topic } : null;
  }

  function getVisualAids(subject, topic) {
    return visualAidsData?.visuals?.[subject]?.[topic] || [];
  }

  function getVideoNotes(subject, topic) {
    return videoNotesData?.videos?.[subject]?.[topic] || null;
  }

  /* ============ PROGRESS (known cards) ============ */
  function loadKnown() {
    try { return JSON.parse(localStorage.getItem(KNOWN_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function saveKnown(map) {
    try { localStorage.setItem(KNOWN_KEY, JSON.stringify(map)); } catch (e) {}
  }
  function cardId(subject, topic, idx) {
    return subject + '::' + topic + '::' + idx;
  }

  function topicId(subject, topic) {
    return subject + '::' + topic;
  }

  function loadMap(key) {
    try { return JSON.parse(localStorage.getItem(key) || '{}'); }
    catch (e) { return {}; }
  }

  function saveMap(key, map) {
    try { localStorage.setItem(key, JSON.stringify(map)); } catch (e) {}
  }

  function markMapItem(key, subject, topic) {
    const map = loadMap(key);
    map[topicId(subject, topic)] = {
      subject,
      topic,
      at: Date.now(),
    };
    saveMap(key, map);
  }

  function isTopicComplete(subject, topic) {
    return !!loadMap(COMPLETE_KEY)[topicId(subject, topic)];
  }

  function markTopicComplete(subject, topic) {
    markMapItem(COMPLETE_KEY, subject, topic);
    refreshTopicTestDropdowns(subject, topic);
    refreshMockControls();
    renderLessonTopicList();
    renderLessonLibrary();
    renderProgressDashboard();
  }

  function subjectOrder() {
    return Object.keys(lessonsData?.lessons || {});
  }

  function subjectTopics(subject) {
    return Object.keys(lessonsData?.lessons?.[subject] || {});
  }

  function subjectComplete(subject) {
    const completed = loadMap(COMPLETE_KEY);
    const topics = subjectTopics(subject);
    return topics.length > 0 && topics.every((topic) => completed[topicId(subject, topic)]);
  }

  function allSubjectsComplete() {
    const subjects = subjectOrder();
    return subjects.length > 0 && subjects.every(subjectComplete);
  }

  function subjectUnlocked(subject) {
    const subjects = subjectOrder();
    const idx = subjects.indexOf(subject);
    if (idx <= 0) return true;
    return subjectComplete(subjects[idx - 1]);
  }

  function firstUnlockedSubject() {
    return subjectOrder().find(subjectUnlocked) || subjectOrder()[0] || '';
  }
  function countKnown() {
    const map = loadKnown();
    const total = totalStudyCardCount();
    let known = 0;
    for (const k in map) if (map[k]) known++;
    return { known, total };
  }

  function shortAnswerQuestions() {
    return allQuestions().filter((q) => q.type === 'short');
  }

  function shortAnswerCount(subject) {
    return shortAnswerQuestions().filter((q) => !subject || q.subject === subject).length;
  }

  function totalStudyCardCount() {
    return totalExampleCount() + shortAnswerCount();
  }

  function subjectStudyCardCount(subject) {
    return subjectExampleCount(subject) + shortAnswerCount(subject);
  }

  function totalExampleCount() {
    let n = 0;
    const ex = examplesData?.examples || {};
    for (const subj in ex) {
      for (const top in ex[subj]) {
        n += (ex[subj][top] || []).length;
      }
    }
    return n;
  }
  function subjectExampleCount(subject) {
    const ex = examplesData?.examples || {};
    if (!ex[subject]) return 0;
    let n = 0;
    for (const top in ex[subject]) n += ex[subject][top].length;
    return n;
  }

  /* ============ RESET (existing) ============ */
  function resetProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(MOCK_KEY);
      localStorage.removeItem(KNOWN_KEY);
      localStorage.removeItem(LESSON_KEY);
      localStorage.removeItem(VIDEO_KEY);
      localStorage.removeItem(QUIZ_RESULTS_KEY);
      localStorage.removeItem(MOCK_HISTORY_KEY);
      localStorage.removeItem(COMPLETE_KEY);
    } catch (e) {}
    renderProgress();
    renderExamplesProgressLine();
    renderHomeStats();
    renderProgressDashboard();
    populateDropdowns();
    if (activeSubject) renderFlashcards();
  }

  function renderProgress() {
    if (els.topicProgressLine) els.topicProgressLine.textContent = 'No saved topic progress yet.';
    if (els.mockProgressLine) els.mockProgressLine.textContent = 'No saved mock result yet.';
    try {
      const topic = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (topic && els.topicProgressLine) {
        const topicLabel = [topic.subject, topic.topic].filter(Boolean).join(' \u2022 ') || 'topic';
        const score = Number.isFinite(topic.correct) ? ' \u2022 Score ' + topic.correct + '/' + topic.total : '';
        els.topicProgressLine.textContent = 'Last: ' + topicLabel + ' \u2022 Question ' + (topic.at || 0) + '/' + (topic.total || '?') + score;
      }
      const mock = JSON.parse(localStorage.getItem(MOCK_KEY) || 'null');
      if (mock && els.mockProgressLine) {
        els.mockProgressLine.textContent = 'Latest: ' + (mock.correct ?? 0) + '/' + (mock.total ?? 0);
      }
    } catch (e) {}
  }

  function kidify(topicTitle) {
    const title = topicTitle || 'this topic';
    return [
      'Hi! Let\'s learn ' + title + '.',
      '',
      '1) First, we look at the big idea.',
      '   Big idea: It helps you answer questions about ' + title + '.',
      '2) Next, we try a tiny example (small step).',
      '   Example: We read the question slowly and find the key words.',
      '3) Then we answer.',
      '   We pick one choice and double-check it.',
      '',
      'Remember: you can go slow. You can do it!'
    ].join('\n');
  }

  /* ============ QUIZ ENGINE ============ */
  function allQuestions() {
    const questions = quizData?.questions || {};
    const out = [];
    for (const subject of Object.keys(questions)) {
      for (const topic of Object.keys(questions[subject] || {})) {
        (questions[subject][topic] || []).forEach((item, idx) => {
          out.push({
            subject,
            topic,
            idx,
            question: item.question || '',
            type: item.type === 'short' ? 'short' : 'mcq',
            options: Array.isArray(item.options) ? item.options : [],
            correctIndex: Number(item.correctIndex),
            modelAnswer: item.modelAnswer || '',
            keywords: Array.isArray(item.keywords) ? item.keywords : [],
            explanation: item.explanation || '',
            selfMark: !!item.selfMark,
          });
        });
      }
    }
    return out.filter((q) => {
      if (q.type === 'short') return q.question && q.modelAnswer;
      return q.options.length > 0 && Number.isInteger(q.correctIndex);
    });
  }

  function topicQuestions(subject, topic) {
    return allQuestions().filter((q) => q.subject === subject && q.topic === topic);
  }

  function unlockedQuestions() {
    const unlocked = new Set(subjectOrder().filter(subjectUnlocked));
    return allQuestions().filter((q) => unlocked.has(q.subject));
  }

  function shuffle(items) {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function getWorkedExample(subject, topic) {
    const arr = examplesData?.examples?.[subject]?.[topic] || [];
    return arr[0] || null;
  }

  function showScreen(name) {
    if (els.screenHome) els.screenHome.hidden = name !== 'home';
    if (els.screenProgress) els.screenProgress.hidden = name !== 'progress';
    if (els.screenLessons) els.screenLessons.hidden = name !== 'lessons';
    if (els.screenExamples) els.screenExamples.hidden = name !== 'examples';
    if (els.screenQuiz) els.screenQuiz.hidden = name !== 'quiz';
    window.scrollTo(0, 0);
  }

  function clampQuestionCount(value, available) {
    const parsed = Number.parseInt(value, 10);
    const wanted = Number.isFinite(parsed) ? parsed : 30;
    return Math.max(1, Math.min(available, Math.max(10, wanted)));
  }

  function startTopicQuiz() {
    const subject = els.selectSubject?.value;
    const topic = els.selectTopic?.value;
    if (!subjectUnlocked(subject)) {
      alert('Finish the subject before this one first. Mark all its topics complete to unlock this subject.');
      return;
    }
    const questions = topicQuestions(subject, topic);
    if (!questions.length) {
      alert('No quiz questions are available for this topic yet.');
      return;
    }
    startQuiz({
      type: 'topic',
      title: topic,
      questions: shuffle(questions),
      subject,
      topic,
      timed: false,
      mode: els.topicQuizMode?.value || 'exam',
    });
  }

  function startMockQuiz() {
    const scope = els.mockScope?.value || 'all';
    const pool = questionsForMockScope(scope);
    if (!pool.length) {
      alert('No quiz questions are available yet.');
      return;
    }
    const total = clampQuestionCount(els.mockTotalQuestions?.value, pool.length);
    const timeLimitSeconds = getMockTimeLimitSeconds();
    const timed = timeLimitSeconds > 0;
    const mode = els.quizMode?.value || 'exam';
    const title = scope === 'all' ? 'All Subjects Mock Exam' : scope + ' Mock Exam';
    startQuiz({
      type: 'mock',
      title,
      questions: shuffle(pool).slice(0, total),
      scope,
      timed,
      mode,
      timeLimitSeconds,
    });
  }

  function questionsForMockScope(scope) {
    if (!scope || scope === 'all') return allQuestions();
    return allQuestions().filter((q) => q.subject === scope);
  }

  function getMockTimeLimitSeconds() {
    const value = els.mockDuration?.value || '0';
    const minutes = value === 'custom'
      ? Number.parseInt(els.mockCustomMinutes?.value, 10)
      : Number.parseInt(value, 10);
    if (!Number.isFinite(minutes) || minutes <= 0) return 0;
    return Math.max(5, Math.min(240, minutes)) * 60;
  }

  function startQuiz(config) {
    stopTimer();
    quizState = {
      type: config.type,
      title: config.title,
      subject: config.subject || '',
      topic: config.topic || '',
      questions: config.questions,
      current: 0,
      correct: 0,
      answers: [],
      selectedIndex: null,
      timed: !!config.timed,
      mode: config.mode || (config.type === 'mock' ? 'exam' : 'learning'),
      scope: config.scope || '',
      timeRemaining: config.timeLimitSeconds || 0,
      initialTimeLimitSeconds: config.timeLimitSeconds || 0,
    };
    showScreen('quiz');
    showPreTeach();
    updateQuizHeader();
  }

  function showPreTeach() {
    if (!quizState) return;
    hideQuizPanels();
    if (els.quizPreTeach) els.quizPreTeach.hidden = false;
    const first = quizState.questions[0];
    const lesson = quizState.type === 'topic'
      ? getLesson(quizState.subject, quizState.topic)
      : lessonsData?.default;
    const ex = quizState.type === 'topic' ? getWorkedExample(quizState.subject, quizState.topic) : null;

    if (els.quizPreTeachKicker) {
      els.quizPreTeachKicker.textContent = quizState.type === 'topic' ? 'Topic lesson' : 'Mock exam warm-up';
    }
    if (els.quizPreTeachTitle) {
      els.quizPreTeachTitle.textContent = quizState.type === 'topic' ? quizState.topic : 'Mixed Mock Exam';
    }
    if (quizState.type === 'topic') markMapItem(LESSON_KEY, quizState.subject, quizState.topic);
    if (els.quizPreTeachLesson) {
      const lines = lesson?.content || lesson?.bullets || kidify(first?.topic || quizState.title).split('\n');
      els.quizPreTeachLesson.innerHTML = lines.map((line) => '<p>' + renderText(makeTextSimple(line)) + '</p>').join('');
    }
    if (els.quizPreTeachExample) {
      els.quizPreTeachExample.hidden = !ex;
    }
    if (ex) {
      els.quizPreTeachExQ.innerHTML = renderText(ex.question || '');
      els.quizPreTeachExA.innerHTML = renderText(ex.answer || '');
      els.quizPreTeachExTip.innerHTML = renderText(makeTextSimple(ex.tip || ''));
    }
    const resources = quizState.type === 'topic' ? getResources(quizState.subject, quizState.topic) : [];
    const video = quizState.type === 'topic' ? getVideo(quizState.subject, quizState.topic) : null;
    const visualAids = quizState.type === 'topic' ? getVisualAids(quizState.subject, quizState.topic) : [];
    const videoNotes = quizState.type === 'topic' ? getVideoNotes(quizState.subject, quizState.topic) : null;
    renderVisualAids(els.quizPreTeachVisuals, visualAids);
    renderVideoTutorial(els.quizPreTeachVideo, video);
    renderVideoNotes(els.quizPreTeachVideoNotes, videoNotes);
    renderResourceLinks(els.quizPreTeachResources, resources);
  }

  function beginQuestions() {
    if (!quizState) return;
    hideQuizPanels();
    if (els.quizQuestionWrap) els.quizQuestionWrap.hidden = false;
    if (quizState.timed) startTimer();
    renderQuestion();
  }

  function hideQuizPanels() {
    if (els.quizPreTeach) els.quizPreTeach.hidden = true;
    if (els.quizQuestionWrap) els.quizQuestionWrap.hidden = true;
    if (els.quizFeedback) els.quizFeedback.hidden = true;
    if (els.quizResult) els.quizResult.hidden = true;
  }

  function currentQuestion() {
    return quizState?.questions?.[quizState.current] || null;
  }

  function renderQuestion() {
    const q = currentQuestion();
    if (!q) {
      finishQuiz();
      return;
    }
    quizState.selectedIndex = null;
    updateQuizHeader();
    if (els.quizFeedback) els.quizFeedback.hidden = true;
    if (els.quizSubjectChip) els.quizSubjectChip.textContent = q.subject;
    if (els.quizTopicChip) els.quizTopicChip.textContent = q.topic;
    if (els.quizQuestion) els.quizQuestion.innerHTML = renderText(q.question);
    if (!els.quizOptions) return;

    els.quizOptions.innerHTML = '';
    if (els.quizShortAnswerWrap) els.quizShortAnswerWrap.hidden = q.type !== 'short';
    if (els.quizShortAnswer) {
      els.quizShortAnswer.value = '';
      els.quizShortAnswer.disabled = false;
    }
    if (els.btnSubmitShortAnswer) els.btnSubmitShortAnswer.disabled = false;

    if (q.type === 'short') {
      els.quizOptions.hidden = true;
    } else {
      els.quizOptions.hidden = false;
      const frag = document.createDocumentFragment();
      q.options.forEach((option, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.innerHTML = '<span class="quiz-option-letter">' + String.fromCharCode(65 + idx) + '</span><span>' + renderText(option) + '</span>';
        btn.addEventListener('click', () => answerQuestion(idx));
        frag.appendChild(btn);
      });
      els.quizOptions.appendChild(frag);
    }
    persistTopicProgress();
  }

  function answerQuestion(selectedIndex) {
    const q = currentQuestion();
    if (!q || quizState.selectedIndex !== null) return;
    quizState.selectedIndex = selectedIndex;
    const correct = selectedIndex === q.correctIndex;
    if (correct) quizState.correct++;
    quizState.answers.push({ q, selectedIndex, correct });

    [...els.quizOptions.querySelectorAll('.quiz-option')].forEach((btn, idx) => {
      btn.disabled = true;
      if (quizState.mode === 'learning') {
        if (idx === q.correctIndex) btn.classList.add('correct');
        if (idx === selectedIndex && !correct) btn.classList.add('incorrect');
      } else if (idx === selectedIndex) {
        btn.classList.add('selected');
      }
    });

    showQuestionFeedback(correct);
    updateQuizHeader();
  }

  function submitShortAnswer() {
    const q = currentQuestion();
    if (!q || q.type !== 'short' || quizState.selectedIndex !== null) return;
    const text = (els.quizShortAnswer?.value || '').trim();
    if (!text) {
      alert('Please write a short answer before submitting.');
      return;
    }
    const matched = countKeywordMatches(text, q.keywords);
    const correct = q.keywords.length ? matched >= Math.min(2, q.keywords.length) : text.split(/\s+/).length >= 6;
    if (correct) quizState.correct++;
    quizState.selectedIndex = -1;
    quizState.answers.push({ q, writtenAnswer: text, correct, matched });
    if (els.quizShortAnswer) els.quizShortAnswer.disabled = true;
    if (els.btnSubmitShortAnswer) els.btnSubmitShortAnswer.disabled = true;
    showQuestionFeedback(correct);
    updateQuizHeader();
  }

  function showQuestionFeedback(correct) {
    const learning = quizState?.mode === 'learning';
    if (els.quizFeedback) els.quizFeedback.hidden = false;
    if (els.quizFeedbackIcon) els.quizFeedbackIcon.textContent = learning ? (correct ? '✓' : '!') : '•';
    if (els.quizFeedbackTitle) {
      els.quizFeedbackTitle.textContent = learning
        ? (correct ? 'Good answer' : 'Check the model answer')
        : 'Answer saved';
    }
    if (els.quizFeedbackAnswer) {
      els.quizFeedbackAnswer.innerHTML = learning
        ? renderText(simpleExplanation(currentQuestion()))
        : 'Your answer has been saved. Model answers and explanations will appear at the end.';
    }
    if (els.quizFeedbackTip) {
      els.quizFeedbackTip.innerHTML = learning
        ? (correct ? 'Great job. Say the answer out loud one more time.' : 'Compare your answer with the model answer, then try to explain why it is right.')
        : 'Keep going like a real exam. Do not change your answer after submitting.';
    }
  }

  function nextQuestion() {
    if (!quizState) return;
    quizState.current++;
    if (quizState.current >= quizState.questions.length) finishQuiz();
    else renderQuestion();
  }

  function updateQuizHeader() {
    if (!quizState) return;
    const total = quizState.questions.length;
    const at = Math.min(quizState.current + 1, total);
    if (els.quizProgressText) els.quizProgressText.textContent = 'Question ' + at + ' of ' + total;
    if (els.quizScoreText) {
      els.quizScoreText.textContent = quizState.mode === 'exam'
        ? 'Answered: ' + quizState.answers.length
        : 'Score: ' + quizState.correct;
    }
    if (els.quizProgressBar) els.quizProgressBar.style.width = total ? ((quizState.current / total) * 100) + '%' : '0%';
    renderTimer();
  }

  function renderTimer() {
    if (!els.quizTimerText || !quizState) return;
    if (!quizState.timed) {
      els.quizTimerText.hidden = true;
      return;
    }
    const minutes = Math.floor(quizState.timeRemaining / 60);
    const seconds = quizState.timeRemaining % 60;
    els.quizTimerText.hidden = false;
    els.quizTimerText.textContent = 'Time: ' + minutes + ':' + String(seconds).padStart(2, '0');
    els.quizTimerText.classList.toggle('is-low', quizState.timeRemaining <= 60);
  }

  function startTimer() {
    stopTimer();
    renderTimer();
    quizTimerId = setInterval(() => {
      if (!quizState) return stopTimer();
      quizState.timeRemaining--;
      renderTimer();
      if (quizState.timeRemaining <= 0) finishQuiz(true);
    }, 1000);
  }

  function stopTimer() {
    if (quizTimerId) clearInterval(quizTimerId);
    quizTimerId = null;
  }

  function finishQuiz(timedOut = false) {
    if (!quizState) return;
    stopTimer();
    recordUnansweredQuestions();
    hideQuizPanels();
    if (els.quizResult) els.quizResult.hidden = false;
    const total = quizState.questions.length;
    const pct = total ? Math.round((quizState.correct / total) * 100) : 0;
    if (els.quizProgressBar) els.quizProgressBar.style.width = '100%';
    if (els.quizResultTitle) els.quizResultTitle.textContent = timedOut ? 'Time is up!' : 'Quiz complete!';
    if (els.quizResultScore) els.quizResultScore.textContent = quizState.correct + '/' + total + ' (' + pct + '%)';
    if (els.quizResultMsg) els.quizResultMsg.textContent = resultMessage(pct, quizState.type);
    persistQuizResult();
    renderReview();
    renderProgress();
    renderProgressDashboard();
  }

  function recordUnansweredQuestions() {
    if (!quizState) return;
    const answered = new Set(quizState.answers.map((item) => item.q));
    quizState.questions.forEach((q) => {
      if (!answered.has(q)) quizState.answers.push({ q, selectedIndex: null, writtenAnswer: '', correct: false });
    });
  }

  function resultMessage(pct, type) {
    if (pct >= 85) return 'Excellent. You are ready to explain these answers, not just choose them.';
    if (pct >= 60) return 'Good progress. Review the missed questions below and try again.';
    return type === 'mock'
      ? 'This mock exam found useful revision targets. Start with the missed topics below.'
      : 'Keep practising this topic. Read the model answers, then retry.';
  }

  function renderReview() {
    if (!els.quizReview || !quizState) return;
    const missed = quizState.answers.filter((a) => !a.correct);
    const reviewItems = quizState.mode === 'exam' ? quizState.answers : missed;
    if (!reviewItems.length) {
      els.quizReview.innerHTML = '<div class="quiz-review-empty">No missed questions. Nicely done.</div>';
      return;
    }
    els.quizReview.innerHTML =
      '<h3>' + (quizState.mode === 'exam' ? 'Review answers' : 'Review missed questions') + '</h3>' +
      reviewItems.map((item) => {
        const q = item.q;
        const yourAnswer = q.type === 'short'
          ? (item.writtenAnswer || 'No answer')
          : (q.options[item.selectedIndex] || 'No answer');
        const correctAnswer = q.type === 'short'
          ? q.modelAnswer
          : (q.options[q.correctIndex] || '');
        const answerLabel = q.type === 'short' ? 'Model answer' : 'Correct answer';
        return '<article class="quiz-review-item">' +
          '<div class="quiz-review-topic">' + escapeHtml(q.subject) + ' · ' + escapeHtml(q.topic) + '</div>' +
          '<div class="quiz-review-q">' + renderText(q.question) + '</div>' +
          '<div class="quiz-review-a">Your answer: ' + renderText(yourAnswer) + '</div>' +
          '<div class="quiz-review-a good">' + answerLabel + ': ' + renderText(correctAnswer) + '</div>' +
          '<div class="quiz-review-explain">' + renderText(simpleExplanation(q)) + '</div>' +
        '</article>';
      }).join('');
  }

  function simpleExplanation(q) {
    if (q?.type === 'short') {
      const answer = q.modelAnswer || 'Write a clear answer using evidence from the question.';
      const why = String(q.explanation || '').trim();
      return why ? answer + ' Why? ' + makeTextSimple(why) : answer;
    }
    const answer = q?.options?.[q.correctIndex] || 'this one';
    const why = String(q?.explanation || '').trim();
    if (!why) {
      return 'The answer is "' + answer + '". That is the best choice.';
    }
    return 'The answer is "' + answer + '". Why? ' + makeTextSimple(why);
  }

  function makeTextSimple(text) {
    return String(text)
      .replace(/therefore/gi, 'so')
      .replace(/greater than/gi, 'bigger than')
      .replace(/less than/gi, 'smaller than')
      .replace(/approximately/gi, 'about')
      .replace(/utilize/gi, 'use')
      .replace(/because/gi, 'because')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function persistTopicProgress() {
    if (!quizState || quizState.type !== 'topic') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        subject: quizState.subject,
        topic: quizState.topic,
        at: quizState.current + 1,
        total: quizState.questions.length,
        updatedAt: Date.now(),
      }));
    } catch (e) {}
  }

  function persistQuizResult() {
    if (!quizState) return;
    const payload = {
      type: quizState.type,
      subject: quizState.subject,
      topic: quizState.topic,
      scope: quizState.scope || '',
      correct: quizState.correct,
      total: quizState.questions.length,
      completedAt: Date.now(),
    };
    try {
      if (quizState.type === 'mock') {
        localStorage.setItem(MOCK_KEY, JSON.stringify(payload));
        const history = JSON.parse(localStorage.getItem(MOCK_HISTORY_KEY) || '[]');
        history.unshift(payload);
        localStorage.setItem(MOCK_HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...payload, at: quizState.questions.length }));
        const results = loadMap(QUIZ_RESULTS_KEY);
        const id = topicId(quizState.subject, quizState.topic);
        const old = results[id] || {};
        const pct = payload.total ? Math.round((payload.correct / payload.total) * 100) : 0;
        const oldBestPct = old.bestTotal ? Math.round((old.bestCorrect / old.bestTotal) * 100) : -1;
        results[id] = {
          subject: quizState.subject,
          topic: quizState.topic,
          attempts: (old.attempts || 0) + 1,
          lastCorrect: payload.correct,
          lastTotal: payload.total,
          lastAt: payload.completedAt,
          bestCorrect: pct >= oldBestPct ? payload.correct : old.bestCorrect,
          bestTotal: pct >= oldBestPct ? payload.total : old.bestTotal,
          bestAt: pct >= oldBestPct ? payload.completedAt : old.bestAt,
        };
        saveMap(QUIZ_RESULTS_KEY, results);
      }
    } catch (e) {}
  }

  function retryQuiz() {
    if (!quizState) return;
    const previous = quizState;
    startQuiz({
      type: previous.type,
      title: previous.title,
      questions: shuffle(previous.questions),
      subject: previous.subject,
      topic: previous.topic,
      timed: previous.timed,
      mode: previous.mode,
      timeLimitSeconds: previous.initialTimeLimitSeconds || previous.timeRemaining || 0,
    });
  }

  function countKeywordMatches(text, keywords) {
    const answer = String(text).toLowerCase();
    return (keywords || []).filter((word) => answer.includes(String(word).toLowerCase())).length;
  }

  function quitQuiz() {
    stopTimer();
    quizState = null;
    showScreen('home');
    renderProgress();
  }

  /* ============ LESSON LIBRARY ============ */
  function openLessons() {
    showScreen('lessons');
    ensureCurrentLesson();
    renderLessonTopicList();
    renderLessonLibrary();
  }

  function closeLessons() {
    showScreen('home');
  }

  function selectedLessonSubject() {
    return currentLessonSubject || els.selectSubject?.value || '';
  }

  function selectedLessonTopic() {
    return currentLessonTopic || els.selectTopic?.value || '';
  }

  function ensureCurrentLesson() {
    const subjects = Object.keys(lessonsData?.lessons || {});
    if (!subjects.length) return;
    if (!currentLessonSubject || !lessonsData.lessons[currentLessonSubject] || !subjectUnlocked(currentLessonSubject)) {
      currentLessonSubject = subjectUnlocked(els.selectSubject?.value) ? els.selectSubject.value : firstUnlockedSubject();
    }
    const topics = topicsForSubject(currentLessonSubject);
    if (!currentLessonTopic || !lessonsData.lessons[currentLessonSubject]?.[currentLessonTopic]) {
      currentLessonTopic = els.selectTopic?.value || topics[0] || '';
    }
  }

  function setCurrentLesson(subject, topic) {
    if (!subjectUnlocked(subject)) return;
    currentLessonSubject = subject;
    currentLessonTopic = topic;
    syncTopicSelectors(subject, topic);
    renderLessonTopicList();
    renderLessonLibrary();
  }

  function renderLessonLibrary() {
    ensureCurrentLesson();
    const subject = selectedLessonSubject();
    const topic = selectedLessonTopic();
    const lesson = getLesson(subject, topic);
    const exampleItems = examplesData?.examples?.[subject]?.[topic] || [];
    const resources = getResources(subject, topic);
    if (subject && topic) markMapItem(LESSON_KEY, subject, topic);

    if (els.lessonTitle) els.lessonTitle.textContent = topic || 'Choose a topic';
    renderLessonStatus(subject, topic);
    if (els.lessonBody) {
      const lines = lesson?.content || kidify(topic || subject || 'this topic').split('\n');
      els.lessonBody.innerHTML = lines
        .filter((line) => line.trim() !== '')
        .map((line) => '<p>' + renderText(makeTextSimple(line)) + '</p>')
        .join('');
    }
    renderVisualAids(els.lessonVisuals, getVisualAids(subject, topic));
    renderVideoTutorial(els.lessonVideo, getVideo(subject, topic));
    renderVideoNotes(els.lessonVideoNotes, getVideoNotes(subject, topic));
    renderLessonExamples(exampleItems);
    renderResourceLinks(els.lessonResources, resources);
  }

  function renderLessonTopicList() {
    if (!els.lessonTopicList) return;
    ensureCurrentLesson();
    const lessons = lessonsData?.lessons || {};
    const completed = loadMap(COMPLETE_KEY);
    const parts = [];
    for (const subject of Object.keys(lessons)) {
      const unlocked = subjectUnlocked(subject);
      const topics = Object.keys(lessons[subject] || {});
      const done = topics.filter((topic) => completed[topicId(subject, topic)]).length;
      parts.push('<section class="lesson-topic-group' + (unlocked ? '' : ' locked') + '">');
      parts.push('<h3>' + escapeHtml(subject) + '<span>' + (unlocked ? done + '/' + topics.length : 'Locked') + '</span></h3>');
      parts.push('<div class="lesson-topic-buttons">');
      for (const topic of topics) {
        const active = subject === currentLessonSubject && topic === currentLessonTopic;
        const complete = !!completed[topicId(subject, topic)];
        parts.push(
          '<button class="lesson-topic-btn' + (active ? ' active' : '') + (complete ? ' complete' : '') + '" type="button" ' +
          (unlocked ? '' : 'disabled ') +
          'data-subject="' + escapeHtml(subject) + '" data-topic="' + escapeHtml(topic) + '">' +
            '<span>' + escapeHtml(topic) + '</span><b>' + (complete ? '✓' : unlocked ? '' : 'Lock') + '</b>' +
          '</button>'
        );
      }
      parts.push('</div></section>');
    }
    els.lessonTopicList.innerHTML = parts.join('');
    els.lessonTopicList.querySelectorAll('.lesson-topic-btn').forEach((btn) => {
      btn.addEventListener('click', () => setCurrentLesson(btn.dataset.subject, btn.dataset.topic));
    });
  }

  function renderLessonStatus(subject, topic) {
    if (!els.lessonStatus) return;
    const complete = isTopicComplete(subject, topic);
    const topics = subjectTopics(subject);
    const done = topics.filter((item) => isTopicComplete(subject, item)).length;
    const nextSubject = subjectOrder()[subjectOrder().indexOf(subject) + 1] || '';
    els.lessonStatus.innerHTML =
      '<div class="lesson-status-chip ' + (complete ? 'complete' : '') + '">' +
        (complete ? '✓ Topic complete' : 'Not complete yet') +
      '</div>' +
      '<div class="lesson-status-text">' +
        escapeHtml(subject) + ': ' + done + '/' + topics.length + ' topics complete' +
        (nextSubject && subjectComplete(subject) ? ' · Next unlocked: ' + escapeHtml(nextSubject) : '') +
      '</div>';
    if (els.btnMarkTopicComplete) {
      els.btnMarkTopicComplete.textContent = complete ? 'Topic Complete ✓' : 'Mark Topic Complete';
      els.btnMarkTopicComplete.disabled = complete;
    }
  }

  function renderLessonExamples(items) {
    if (!els.lessonExamples) return;
    if (!items.length) {
      els.lessonExamples.innerHTML = '';
      return;
    }
    els.lessonExamples.innerHTML =
      '<h3>Worked examples</h3>' +
      items.map((item, i) => (
        '<article class="lesson-example">' +
          '<div class="lesson-example-label">Example ' + (i + 1) + '</div>' +
          '<div class="lesson-example-q">' + renderText(item.question || '') + '</div>' +
          '<div class="lesson-example-a">' + renderText(item.answer || '') + '</div>' +
          '<div class="lesson-example-tip">' + renderText(makeTextSimple(item.tip || '')) + '</div>' +
        '</article>'
      )).join('');
  }

  function renderResourceLinks(target, resources) {
    if (!target) return;
    if (!resources.length) {
      target.innerHTML = '<div class="resource-empty">No tutorial source links have been added for this topic yet.</div>';
      return;
    }
    target.innerHTML =
      '<h3>Tutorial source links</h3>' +
      '<div class="resource-links">' +
      resources.map((item) => (
        '<a class="resource-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener noreferrer">' +
          '<span>' + escapeHtml(item.title || item.url) + '</span>' +
          '<small>' + escapeHtml(item.url) + '</small>' +
        '</a>'
      )).join('') +
      '</div>';
  }

  function renderVisualAids(target, visualAids) {
    if (!target) return;
    if (!visualAids.length) {
      target.innerHTML = '';
      return;
    }
    target.innerHTML =
      '<h3>Visual aid</h3>' +
      '<div class="visual-aid-grid">' +
      visualAids.map((item) => {
        if (item.type === 'image' && item.imageUrl) {
          return '<article class="visual-aid-card">' +
            '<a class="visual-aid-image-link" href="' + escapeHtml(item.sourceUrl || item.imageUrl) + '" target="_blank" rel="noopener noreferrer">' +
              '<img class="visual-aid-image" src="' + escapeHtml(item.imageUrl) + '" alt="' + escapeHtml(item.title || 'Lesson visual aid') + '" loading="lazy" />' +
            '</a>' +
            '<div class="visual-aid-copy">' +
              '<div class="visual-aid-title">' + escapeHtml(item.title || 'Visual aid') + '</div>' +
              '<p>' + renderText(item.caption || '') + '</p>' +
              '<a href="' + escapeHtml(item.sourceUrl || item.imageUrl) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(item.credit || 'Image source') + '</a>' +
            '</div>' +
          '</article>';
        }
        const points = Array.isArray(item.points) ? item.points : [];
        return '<article class="visual-aid-card visual-aid-diagram">' +
          '<div class="visual-diagram-mark">' + escapeHtml((item.title || 'V').slice(0, 1).toUpperCase()) + '</div>' +
          '<div class="visual-aid-copy">' +
            '<div class="visual-aid-title">' + escapeHtml(item.title || 'Study diagram') + '</div>' +
            '<p>' + renderText(item.caption || '') + '</p>' +
            (points.length ? '<ul>' + points.map((point) => '<li>' + renderText(point) + '</li>').join('') + '</ul>' : '') +
          '</div>' +
        '</article>';
      }).join('') +
      '</div>';
  }

  function renderVideoNotes(target, notes) {
    if (!target) return;
    if (!notes?.keyNotes?.length) {
      target.innerHTML = '';
      return;
    }
    const status = notes.transcriptStatus === 'available'
      ? 'Transcript checked: available (' + (notes.transcriptWordCount || 0) + ' words)'
      : 'Transcript checked: ' + escapeHtml(notes.transcriptStatus || 'not available');
    target.innerHTML =
      '<h3>Video lesson notes</h3>' +
      '<article class="video-notes-card">' +
        '<div class="video-notes-head">' +
          '<div>' +
            '<div class="video-label">Linked video notes</div>' +
            '<div class="video-title">' + escapeHtml(notes.title || 'Video lesson') + '</div>' +
          '</div>' +
          '<span class="video-notes-status">' + status + '</span>' +
        '</div>' +
        '<ul>' + notes.keyNotes.map((note) => '<li>' + renderText(note) + '</li>').join('') + '</ul>' +
        '<div class="video-notes-practice">' + renderText(notes.practicePrompt || '') + '</div>' +
      '</article>';
  }

  function renderVideoTutorial(target, video) {
    if (!target) return;
    if (!video?.youtubeId) {
      target.innerHTML = '';
      return;
    }
    const safeId = String(video.youtubeId).replace(/[^a-zA-Z0-9_-]/g, '');
    const title = escapeHtml(video.title || 'Video tutorial');
    const frameTitle = escapeHtml('Video tutorial: ' + (video.title || 'Revision topic'));
    target.innerHTML =
      '<div class="video-card">' +
        '<div class="video-card-head">' +
          '<div>' +
            '<div class="video-label">Optional video tutorial</div>' +
            '<div class="video-title">' + title + '</div>' +
          '</div>' +
          '<button class="btn btn-secondary video-toggle" type="button" aria-expanded="false">Watch Video Tutorial</button>' +
        '</div>' +
        '<div class="video-frame-wrap" hidden></div>' +
      '</div>';

    const button = target.querySelector('.video-toggle');
    const wrap = target.querySelector('.video-frame-wrap');
    button.addEventListener('click', () => {
      const open = wrap.hidden;
      wrap.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      button.textContent = open ? 'Hide Video Tutorial' : 'Watch Video Tutorial';
      if (open && !wrap.querySelector('iframe')) {
        if (video.subject && video.topic) markMapItem(VIDEO_KEY, video.subject, video.topic);
        wrap.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + safeId + '?rel=0&modestbranding=1" ' +
          'title="' + frameTitle + '" loading="lazy" ' +
          'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
          'allowfullscreen></iframe>';
      }
    });
  }

  function startLessonTopicQuiz() {
    ensureCurrentLesson();
    syncTopicSelectors(selectedLessonSubject(), selectedLessonTopic());
    startTopicQuiz();
  }

  function completeCurrentLessonTopic() {
    ensureCurrentLesson();
    markTopicComplete(selectedLessonSubject(), selectedLessonTopic());
  }

  /* ============ DROPDOWNS ============ */
  function addOptions(sel, items) {
    if (!sel) return;
    sel.innerHTML = '';
    for (const item of items) {
      const opt = document.createElement('option');
      opt.value = item; opt.textContent = item;
      sel.appendChild(opt);
    }
  }

  function refreshTopicTestDropdowns(preferredSubject, preferredTopic) {
    if (!els.selectSubject || !els.selectTopic) return;
    const subjects = subjectOrder().filter(subjectUnlocked);
    const nextSubject = subjects.includes(preferredSubject) ? preferredSubject : firstUnlockedSubject();
    addOptions(els.selectSubject, subjects);
    els.selectSubject.value = nextSubject;
    const topics = topicsForSubject(nextSubject);
    addOptions(els.selectTopic, topics);
    if (preferredTopic && topics.includes(preferredTopic)) els.selectTopic.value = preferredTopic;
  }

  function topicsForSubject(subject) {
    return lessonsData?.lessons?.[subject] ? Object.keys(lessonsData.lessons[subject]) : [];
  }

  function syncTopicSelectors(subject, topic) {
    if (els.selectSubject) els.selectSubject.value = subject;
    if (els.selectTopic) {
      addOptions(els.selectTopic, topicsForSubject(subject));
      els.selectTopic.value = topic;
    }
  }

  function populateDropdowns() {
    const selectSubject = els.selectSubject;
    const selectTopic = els.selectTopic;
    if (!selectSubject || !selectTopic) return;
    const subjects = Object.keys(lessonsData?.lessons || {});
    addOptions(selectSubject, subjects.filter(subjectUnlocked));
    const initialSubject = selectSubject.value || firstUnlockedSubject();
    const initialTopics = topicsForSubject(initialSubject);
    addOptions(selectTopic, initialTopics);
    selectSubject.addEventListener('change', () => {
      addOptions(selectTopic, topicsForSubject(selectSubject.value));
    });

    addOptions(els.lessonSubject, subjects);
    addOptions(els.lessonTopic, initialTopics);
    if (els.lessonSubject) {
      els.lessonSubject.addEventListener('change', () => {
        addOptions(els.lessonTopic, topicsForSubject(els.lessonSubject.value));
        renderLessonLibrary();
      });
    }
    if (els.lessonTopic) els.lessonTopic.addEventListener('change', renderLessonLibrary);
    currentLessonSubject = selectSubject.value || initialSubject || '';
    currentLessonTopic = selectTopic.value || initialTopics[0] || '';
    refreshMockControls();
    refreshMockTimingControls();
  }

  function refreshMockControls() {
    if (!els.mockScope) return;
    const previousScope = els.mockScope.value || 'all';
    const subjects = subjectOrder();
    const options = ['all'].concat(subjects);
    els.mockScope.innerHTML = '';
    for (const optionValue of options) {
      const opt = document.createElement('option');
      opt.value = optionValue;
      opt.textContent = optionValue === 'all' ? 'All subjects mixed mock exam' : optionValue + ' mock exam';
      els.mockScope.appendChild(opt);
    }
    els.mockScope.value = options.includes(previousScope) ? previousScope : 'all';
    updateMockScopeDetails();
  }

  function updateMockScopeDetails() {
    if (!els.mockScope) return;
    const scope = els.mockScope.value || 'all';
    const pool = questionsForMockScope(scope);
    const max = pool.length;
    if (els.mockScopeHint) {
      els.mockScopeHint.textContent = scope === 'all'
        ? 'Mixed mock exam across all subjects: ' + max + ' available questions.'
        : scope + ' mock exam: ' + max + ' available questions.';
    }
    if (els.mockTotalQuestions) {
      els.mockTotalQuestions.max = String(Math.max(1, Math.min(60, max)));
      if (Number(els.mockTotalQuestions.value) > max) els.mockTotalQuestions.value = String(Math.max(1, Math.min(30, max)));
    }
  }

  function refreshMockTimingControls() {
    if (!els.mockDuration || !els.mockCustomDurationRow) return;
    els.mockCustomDurationRow.hidden = els.mockDuration.value !== 'custom';
  }

  function wireQuiz() {
    if (els.btnStartTopic) els.btnStartTopic.addEventListener('click', startTopicQuiz);
    if (els.btnStartMock) els.btnStartMock.addEventListener('click', startMockQuiz);
    if (els.btnPreTeachStart) els.btnPreTeachStart.addEventListener('click', beginQuestions);
    if (els.btnNextQuestion) els.btnNextQuestion.addEventListener('click', nextQuestion);
    if (els.btnSubmitShortAnswer) els.btnSubmitShortAnswer.addEventListener('click', submitShortAnswer);
    if (els.btnQuitQuiz) els.btnQuitQuiz.addEventListener('click', quitQuiz);
    if (els.btnQuizHome) els.btnQuizHome.addEventListener('click', quitQuiz);
    if (els.btnQuizRetry) els.btnQuizRetry.addEventListener('click', retryQuiz);
    if (els.mockScope) els.mockScope.addEventListener('change', updateMockScopeDetails);
    if (els.mockDuration) els.mockDuration.addEventListener('change', refreshMockTimingControls);
  }

  function wireLessonsLibrary() {
    if (els.btnOpenLessons) els.btnOpenLessons.addEventListener('click', openLessons);
    if (els.btnLessonBackHome) els.btnLessonBackHome.addEventListener('click', closeLessons);
    if (els.btnLessonStartQuiz) els.btnLessonStartQuiz.addEventListener('click', startLessonTopicQuiz);
    if (els.btnMarkTopicComplete) els.btnMarkTopicComplete.addEventListener('click', completeCurrentLessonTopic);
  }

  /* ============ PROGRESS DASHBOARD ============ */
  function openProgress() {
    showScreen('progress');
    renderProgressDashboard();
  }

  function closeProgress() {
    showScreen('home');
  }

  function allLessonTopics() {
    const lessons = lessonsData?.lessons || {};
    const out = [];
    for (const subject of Object.keys(lessons)) {
      for (const topic of Object.keys(lessons[subject] || {})) out.push({ subject, topic });
    }
    return out;
  }

  function pct(part, total) {
    return total ? Math.round((part / total) * 100) : 0;
  }

  function bestPct(result) {
    return result?.bestTotal ? Math.round((result.bestCorrect / result.bestTotal) * 100) : null;
  }

  function renderProgressDashboard() {
    if (!els.progressSummary || !lessonsData || !examplesData) return;
    const topics = allLessonTopics();
    const totalTopics = topics.length;
    const lessonsViewed = loadMap(LESSON_KEY);
    const videosWatched = loadMap(VIDEO_KEY);
    const quizResults = loadMap(QUIZ_RESULTS_KEY);
    const completed = loadMap(COMPLETE_KEY);
    const known = countKnown();
    let mockHistory = [];
    try { mockHistory = JSON.parse(localStorage.getItem(MOCK_HISTORY_KEY) || '[]'); } catch (e) {}

    const attemptedTopics = Object.keys(quizResults).length;
    const quizBestValues = Object.values(quizResults).map(bestPct).filter((value) => value !== null);
    const avgBest = quizBestValues.length
      ? Math.round(quizBestValues.reduce((sum, value) => sum + value, 0) / quizBestValues.length)
      : 0;

    els.progressSummary.innerHTML =
      progressTile('Lessons Opened', Object.keys(lessonsViewed).length + '/' + totalTopics, pct(Object.keys(lessonsViewed).length, totalTopics)) +
      progressTile('Topics Complete', Object.keys(completed).length + '/' + totalTopics, pct(Object.keys(completed).length, totalTopics)) +
      progressTile('Videos Watched', Object.keys(videosWatched).length + '/' + totalTopics, pct(Object.keys(videosWatched).length, totalTopics)) +
      progressTile('Flashcards Known', known.known + '/' + known.total, pct(known.known, known.total)) +
      progressTile('Topic Tests Tried', attemptedTopics + '/' + totalTopics, pct(attemptedTopics, totalTopics)) +
      progressTile('Best Test Average', avgBest + '%', avgBest) +
      progressTile('Mock Exams', String(mockHistory.length), Math.min(mockHistory.length * 10, 100));

    renderSubjectProgress(topics, lessonsViewed, videosWatched, quizResults, completed);
    renderRecentProgress(mockHistory, quizResults);
  }

  function progressTile(label, value, percent) {
    return '<article class="progress-tile">' +
      '<div class="progress-tile-label">' + escapeHtml(label) + '</div>' +
      '<div class="progress-tile-value">' + escapeHtml(value) + '</div>' +
      '<div class="progress-track"><div class="progress-fill" style="width:' + Math.max(0, Math.min(100, percent)) + '%"></div></div>' +
    '</article>';
  }

  function renderSubjectProgress(topics, lessonsViewed, videosWatched, quizResults, completed) {
    if (!els.progressSubjects) return;
    const subjects = Object.keys(lessonsData?.lessons || {});
    els.progressSubjects.innerHTML =
      '<h2>By subject</h2>' +
      subjects.map((subject) => {
        const subjectTopics = topics.filter((item) => item.subject === subject);
        const total = subjectTopics.length;
        const lessons = subjectTopics.filter((item) => lessonsViewed[topicId(item.subject, item.topic)]).length;
        const videos = subjectTopics.filter((item) => videosWatched[topicId(item.subject, item.topic)]).length;
        const done = subjectTopics.filter((item) => completed[topicId(item.subject, item.topic)]).length;
        const tests = subjectTopics
          .map((item) => quizResults[topicId(item.subject, item.topic)])
          .filter(Boolean);
        const scores = tests.map(bestPct).filter((value) => value !== null);
        const score = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0;
        return '<article class="progress-subject">' +
          '<div class="progress-subject-head">' +
            '<h3>' + escapeHtml(subject) + '</h3>' +
            '<span>' + (subjectUnlocked(subject) ? done + '/' + total + ' complete' : 'Locked') + '</span>' +
          '</div>' +
          '<div class="progress-subject-grid">' +
            '<div>Complete: <b>' + done + '/' + total + '</b></div>' +
            '<div>Lessons: <b>' + lessons + '/' + total + '</b></div>' +
            '<div>Videos: <b>' + videos + '/' + total + '</b></div>' +
            '<div>Tests: <b>' + tests.length + '/' + total + '</b></div>' +
            '<div>Best score: <b>' + score + '%</b></div>' +
          '</div>' +
        '</article>';
      }).join('');
  }

  function renderRecentProgress(mockHistory, quizResults) {
    if (!els.progressRecent) return;
    const latestTopics = Object.values(quizResults)
      .sort((a, b) => (b.lastAt || 0) - (a.lastAt || 0))
      .slice(0, 5);
    els.progressRecent.innerHTML =
      '<h2>Recent work</h2>' +
      '<div class="progress-recent-list">' +
      (latestTopics.length ? latestTopics.map((item) => (
        '<article class="progress-recent-item">' +
          '<b>' + escapeHtml(item.topic) + '</b>' +
          '<span>' + escapeHtml(item.subject) + ' · Last ' + item.lastCorrect + '/' + item.lastTotal +
          ' · Best ' + (bestPct(item) ?? 0) + '%</span>' +
        '</article>'
      )).join('') : '<div class="resource-empty">No topic tests completed yet.</div>') +
      (mockHistory.length ? mockHistory.slice(0, 3).map((item) => (
        '<article class="progress-recent-item">' +
          '<b>Mock exam</b>' +
          '<span>' + escapeHtml(mockScopeLabel(item.scope)) + ' · ' + item.correct + '/' + item.total + ' completed</span>' +
        '</article>'
      )).join('') : '') +
      '</div>';
  }

  function mockScopeLabel(scope) {
    if (!scope || scope === 'all') return 'All subjects';
    return scope;
  }

  /* ============ HOME: EXAMPLES STATS ============ */
  function renderHomeStats() {
    if (!els.examplesStats) return;
    const ex = examplesData?.examples || {};
    const subjects = Object.keys(ex);
    const { known, total } = countKnown();
    const parts = [];
    parts.push('<span class="stat-chip"><b>' + total + '</b> flashcards</span>');
    parts.push('<span class="stat-chip"><span class="stat-dot" style="background:' + (known > 0 ? 'var(--gold)' : 'rgba(255,255,255,.3)') + '"></span><b>' + known + '</b> marked known</span>');
    for (const subj of subjects) {
      const n = subjectExampleCount(subj);
      const cards = subjectStudyCardCount(subj);
      const color = SUBJECT_COLORS[subj] || 'var(--brand)';
      parts.push('<span class="stat-chip"><span class="stat-dot" style="background:' + color + '"></span>' + escapeHtml(subj) + ' <b>' + cards + '</b></span>');
    }
    els.examplesStats.innerHTML = parts.join('');
  }

  /* ============ EXAMPLES SCREEN ============ */
  function openExamples() {
    if (els.screenHome) els.screenHome.hidden = true;
    if (els.screenExamples) els.screenExamples.hidden = false;
    window.scrollTo(0, 0);
    renderSubjectTabs();
    renderFlashcards();
    renderExamplesProgressLine();
  }
  function closeExamples() {
    if (els.screenExamples) els.screenExamples.hidden = true;
    if (els.screenHome) els.screenHome.hidden = false;
    renderHomeStats();
    window.scrollTo(0, 0);
  }

  function renderSubjectTabs() {
    if (!els.subjectTabs) return;
    const ex = examplesData?.examples || {};
    const subjects = Object.keys(ex);
    const tabs = ['All'].concat(subjects);
    const frag = document.createDocumentFragment();
    for (const subj of tabs) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'subject-tab' + (subj === activeSubject ? ' active' : '');
      btn.setAttribute('role', 'tab');
      const color = SUBJECT_COLORS[subj] || 'var(--brand)';
      btn.style.setProperty('--tab-color', color);
      const count = subj === 'All' ? totalStudyCardCount() : subjectStudyCardCount(subj);
      const label = subj === 'All' ? 'All' : subj;
      btn.innerHTML = '<span>' + escapeHtml(label) + '</span><span class="tab-count">' + count + '</span>';
      btn.addEventListener('click', () => {
        activeSubject = subj;
        renderSubjectTabs();
        renderFlashcards();
      });
      frag.appendChild(btn);
    }
    els.subjectTabs.innerHTML = '';
    els.subjectTabs.appendChild(frag);
  }

  function renderExamplesProgressLine() {
    if (!els.examplesProgressLine) return;
    const { known, total } = countKnown();
    const pct = total ? Math.round((known / total) * 100) : 0;
    els.examplesProgressLine.innerHTML =
      'You\'ve marked <b>' + known + '</b> of <b>' + total + '</b> cards as known (' + pct + '%). ' +
      'Click the \u2605 on a card to mark it.';
  }

  function collectCards() {
    // returns array of { id, subject, topic, idx, q, a, tip, source }
    const ex = examplesData?.examples || {};
    const out = [];
    const subjects = Object.keys(ex);
    for (const subj of subjects) {
      if (activeSubject !== 'All' && subj !== activeSubject) continue;
      const topics = Object.keys(ex[subj]);
      for (const top of topics) {
        const arr = ex[subj][top] || [];
        arr.forEach((item, i) => {
          out.push({
            id: cardId(subj, top, i),
            subject: subj,
            topic: top,
            idx: i,
            source: 'Worked Example',
            q: item.question || '',
            a: item.answer || '',
            tip: item.tip || '',
          });
        });
      }
    }
    shortAnswerQuestions().forEach((item, i) => {
      if (activeSubject !== 'All' && item.subject !== activeSubject) return;
      out.push({
        id: item.subject + '::' + item.topic + '::short::' + item.idx + '::' + i,
        subject: item.subject,
        topic: item.topic,
        idx: item.idx,
        source: 'Short Answer',
        q: item.question || '',
        a: item.modelAnswer || '',
        tip: item.explanation || 'Compare your answer with the model answer and check that you used topic words.',
      });
    });
    return out;
  }

  function matchesSearch(card) {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const hay = (card.subject + ' ' + card.topic + ' ' + card.q + ' ' + card.a + ' ' + card.tip).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function renderFlashcards() {
    if (!els.flashcardsGrid) return;
    const all = collectCards();
    const cards = all.filter(matchesSearch);

    // meta
    if (els.examplesMeta) {
      const label = activeSubject === 'All' ? 'all subjects' : activeSubject;
      let meta = 'Showing <b>' + cards.length + '</b> card' + (cards.length === 1 ? '' : 's') + ' for <b>' + escapeHtml(label) + '</b>';
      if (searchQuery) meta += ' matching &ldquo;' + escapeHtml(searchQuery) + '&rdquo;';
      els.examplesMeta.innerHTML = meta;
    }

    if (cards.length === 0) {
      els.flashcardsGrid.innerHTML = '';
      if (els.examplesEmpty) els.examplesEmpty.hidden = false;
      return;
    }
    if (els.examplesEmpty) els.examplesEmpty.hidden = true;

    const known = loadKnown();
    const frag = document.createDocumentFragment();
    const showSubjectLabel = (activeSubject === 'All' || searchQuery) ? true : false;

    for (const card of cards) {
      const id = card.id || cardId(card.subject, card.topic, card.idx);
      const color = SUBJECT_COLORS[card.subject] || 'var(--brand)';
      const isKnown = !!known[id];

      const el = document.createElement('article');
      el.className = 'flashcard';
      el.style.setProperty('--card-color', color);
      el.dataset.id = id;

      const topicLine = showSubjectLabel
        ? escapeHtml(card.subject) + ' &middot; ' + escapeHtml(card.topic) + ' &middot; ' + escapeHtml(card.source || 'Study Card')
        : escapeHtml(card.topic) + ' &middot; ' + escapeHtml(card.source || 'Study Card');

      el.innerHTML =
        '<button class="flashcard-star' + (isKnown ? ' on' : '') + '" type="button" title="Mark as known" aria-label="Mark as known">\u2605</button>' +
        '<div class="flashcard-topic">' + topicLine + '</div>' +
        '<div class="flashcard-q">' + renderText(card.q) + '</div>' +
        '<button class="flashcard-reveal" type="button">Reveal answer</button>' +
        '<div class="flashcard-a">' +
          '<span class="flashcard-a-label">Model answer</span>' +
          '<div class="flashcard-a-text">' + renderText(card.a) + '</div>' +
        '</div>' +
        '<div class="flashcard-tip">' +
          '<span class="flashcard-tip-label">Grading tip</span>' +
          renderText(card.tip) +
        '</div>';

      // wire reveal
      const revealBtn = el.querySelector('.flashcard-reveal');
      const ansEl = el.querySelector('.flashcard-a');
      const tipEl = el.querySelector('.flashcard-tip');
      revealBtn.addEventListener('click', () => {
        const open = ansEl.classList.toggle('show');
        tipEl.classList.toggle('show', open);
        revealBtn.textContent = open ? 'Hide answer' : 'Reveal answer';
        revealBtn.classList.toggle('revealed', open);
      });

      // wire star
      const starBtn = el.querySelector('.flashcard-star');
      starBtn.addEventListener('click', () => {
        const map = loadKnown();
        if (map[id]) { delete map[id]; starBtn.classList.remove('on'); }
        else { map[id] = true; starBtn.classList.add('on'); }
        saveKnown(map);
        renderExamplesProgressLine();
      });

      frag.appendChild(el);
    }
    els.flashcardsGrid.innerHTML = '';
    els.flashcardsGrid.appendChild(frag);
  }

  /* ============ HELPERS: text rendering ============ */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  // Our data uses a small, controlled set of HTML: <u> for underlined digits.
  // We allow <u> and escape everything else, plus convert newlines to <br>.
  function renderText(s) {
    const placeholders = [];
    let working = String(s);
    // protect <u>...</u>
    working = working.replace(/<u>([\s\S]*?)<\/u>/gi, (m) => {
      placeholders.push(m);
      return '\u0000PH' + (placeholders.length - 1) + '\u0000';
    });
    working = escapeHtml(working);
    // restore <u>
    working = working.replace(/\u0000PH(\d+)\u0000/g, (m, i) => placeholders[+i]);
    // newlines
    working = working.replace(/\r?\n/g, '<br>');
    return working;
  }

  /* ============ PRINT BOOKLET ============ */
  function buildPrintBooklet() {
    if (!els.printBooklet) return;
    const ex = examplesData?.examples || {};
    const subjects = Object.keys(ex);
    const { known, total } = countKnown();
    const dateStr = new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

    const parts = [];
    // cover
    parts.push(
      '<div class="pb-cover">' +
        '<h1>Grade 6 Exam Revision</h1>' +
        '<p class="pb-sub">Worked Examples &mdash; Study Flashcards Booklet</p>' +
        '<p class="pb-sub">Vanuatu &bull; ' + escapeHtml(dateStr) + '</p>' +
        '<div class="pb-rule"></div>' +
        '<p class="pb-stats">' + total + ' model answers across ' + subjects.length + ' subjects. ' +
        known + ' marked as known on this device.</p>' +
        '<p class="pb-stats" style="margin-top:14px;font-size:11px;color:#555;">Printed from the Exam Revision web app.</p>' +
      '</div>'
    );

    // per-subject sections
    for (const subj of subjects) {
      const topics = Object.keys(ex[subj]);
      const subjCount = subjectExampleCount(subj);
      parts.push('<div class="pb-subject">');
      parts.push('<h2 class="pb-subject-title">' + escapeHtml(subj) + '</h2>');
      parts.push('<p class="pb-subject-meta">' + topics.length + ' topics &bull; ' + subjCount + ' worked examples</p>');
      for (const top of topics) {
        const arr = ex[subj][top] || [];
        parts.push('<div class="pb-topic">');
        parts.push('<div class="pb-topic-name">' + escapeHtml(top) + '</div>');
        arr.forEach((item, i) => {
          parts.push('<div class="pb-example">');
          parts.push('<div class="pb-q-label">Example ' + (i + 1) + ' &mdash; Question</div>');
          parts.push('<div class="pb-q">' + renderText(item.question || '') + '</div>');
          parts.push('<div class="pb-a-label">Model answer</div>');
          parts.push('<div class="pb-a">' + renderText(item.answer || '') + '</div>');
          parts.push('<div class="pb-tip-label">Grading tip</div>');
          parts.push('<div class="pb-tip">' + renderText(item.tip || '') + '</div>');
          parts.push('</div>');
        });
        parts.push('</div>');
      }
      parts.push('</div>');
    }

    // footer
    parts.push(
      '<div class="pb-footer">' +
        '<p>End of booklet &mdash; Grade 6 Exam Revision, Vanuatu.</p>' +
        '<p style="margin-top:6px;">Tip: mark each card with a tick once you can answer it without looking.</p>' +
      '</div>'
    );

    els.printBooklet.innerHTML = parts.join('');
  }

  function printBooklet() {
    buildPrintBooklet();
    els.printBooklet.hidden = false;
    // give the browser a tick to paint, then print
    setTimeout(() => {
      window.print();
      // hide again after print dialog
      setTimeout(() => { els.printBooklet.hidden = true; }, 300);
    }, 50);
  }

  /* ============ WIRING ============ */
  function wireExamples() {
    if (els.btnOpenExamples) els.btnOpenExamples.addEventListener('click', openExamples);
    if (els.btnBackHome) els.btnBackHome.addEventListener('click', closeExamples);
    if (els.btnPrintBooklet) els.btnPrintBooklet.addEventListener('click', printBooklet);
    if (els.examplesSearch) {
      let t = null;
      els.examplesSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        clearTimeout(t);
        t = setTimeout(renderFlashcards, 120);
      });
    }
  }

  function wireReset() {
    if (els.btnReset) els.btnReset.addEventListener('click', resetProgress);
  }

  /* ============ INIT ============ */
  async function init() {
    await Promise.all([
      loadLessons(),
      loadExamples(),
      loadQuizQuestions(),
      loadResources(),
      loadVideos(),
      loadVisualAids(),
      loadVideoNotes(),
    ]);
    populateDropdowns();
    renderLessonLibrary();
    renderProgress();
    renderHomeStats();
    wireReset();
    wireQuiz();
    wireLessonsLibrary();
    if (els.btnOpenProgress) els.btnOpenProgress.addEventListener('click', openProgress);
    if (els.btnProgressBackHome) els.btnProgressBackHome.addEventListener('click', closeProgress);
    wireExamples();
  }

  init();
})();
