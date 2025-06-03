import { useState } from "react";
import { happinessQuestions } from "./data";

export default function HappinessQuiz() {
  const [answers, setAnswers] = useState(Array(happinessQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChange = (value) => {
    const updated = [...answers];
    updated[currentIndex] = parseInt(value);
    setAnswers(updated);
  };

  const handleNext = () => {
    if (answers[currentIndex] === null) return;

    if (currentIndex >= happinessQuestions.length - 1) {
      setSubmitted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const averageScore = () => {
    const valid = answers.filter((a) => a !== null);
    if (valid.length === 0) return 0;
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(2);
  };

  const progressPercentage = ((currentIndex + 1) / happinessQuestions.length) * 100;

  const getAdvice = (score) => {
    const numericScore = parseFloat(score);
    if (numericScore === 0) {
      return "Не одговори на прашањата, обиди се повторно.";
    } else if (numericScore <= 2) {
      return "Се чини дека ти треба повеќе внимание на твоето ментално здравје. Обиди се да одвоиш време за себе и да се поврзиш со пријатели или професионалец.";
    } else if (numericScore <= 3.5) {
      return "Твојот резултат е просечен. Обиди се да вклучиш повеќе позитивни активности во секојдневието.";
    } else if (numericScore <= 4.5) {
      return "Имаш добра ментална добросостојба, но секогаш има простор за подобрување. Продолжи со добрите навики!";
    } else {
      return "Одлично! Твојот резултат покажува многу високо ниво на психолошка добросостојба. Продолжи со тоа!";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-6 sm:p-8 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-700">
          Квиз за психолошка добросостојба
        </h1>

        {!submitted ? (
          currentIndex < happinessQuestions.length && (
            <>
              <div className="mb-8">
                <div className="flex justify-between text-sm text-purple-600 mb-2">
                  <span>Прашање {currentIndex + 1} од {happinessQuestions.length}</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3">
                  <div 
                    className="bg-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 leading-relaxed text-center">
                  {happinessQuestions[currentIndex]}
                </p>

                <div className="flex justify-between mb-4 px-2 text-sm text-purple-700 font-medium">
                  <span>Потполно не се согласувам</span>
                  <span>Потполно се согласувам</span>
                </div>
=
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label
                      key={val}
                      className={`cursor-pointer select-none rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center border-2 transition-all duration-200
                        ${
                          answers[currentIndex] === val
                            ? "bg-purple-600 text-white border-purple-600 shadow-lg transform scale-105"
                            : "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 hover:border-purple-300"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={`q-${currentIndex}`}
                        value={val}
                        className="sr-only"
                        onChange={(e) => handleChange(e.target.value)}
                        checked={answers[currentIndex] === val}
                      />
                      <span className="text-lg sm:text-xl font-bold">{val}</span>
                    </label>
                  ))}
                </div>
              </div>


              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`rounded-full px-6 py-3 font-semibold transition-all duration-200
                    ${
                      currentIndex === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-purple-200 text-purple-700 hover:bg-purple-300 hover:shadow-md"
                    }`}
                >
                  Претходно
                </button>

                <button
                  onClick={handleNext}
                  disabled={answers[currentIndex] === null}
                  className={`rounded-full px-6 py-3 font-semibold transition-all duration-200
                    ${
                      answers[currentIndex] === null
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transform hover:scale-105"
                    }`}
                >
                  {currentIndex === happinessQuestions.length - 1 ? "Заврши" : "Следно"}
                </button>
              </div>
            </>
          )
        ) : (
          <div className="text-center py-8 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-6">
              Твојот резултат е:
            </h2>
            <div className="bg-purple-50 rounded-3xl p-8 mb-6">
              <p className="text-6xl sm:text-8xl font-extrabold text-purple-600 mb-4">
                {averageScore()}
              </p>
              <p className="text-xl text-purple-700 font-semibold">од 5</p>
            </div>
            <p className="text-purple-700 max-w-md mx-auto mb-6 leading-relaxed">
              Овој резултат го прикажува твоето моментално чувство на добросостојба според одговорите.
              Запомни: не постојат точни или неточни одговори – важно е да си искрен/а со себе.
            </p>
            <p className="text-center text-purple-800 max-w-md mx-auto mb-10 font-semibold text-lg px-4">
              {getAdvice(averageScore())}
            </p>
            <button
              onClick={() => {
                setAnswers(Array(happinessQuestions.length).fill(null));
                setSubmitted(false);
                setCurrentIndex(0);
              }}
              className="bg-purple-600 text-white px-8 py-4 rounded-3xl font-semibold hover:bg-purple-700 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              Повтори квиз
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
