import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, Dumbbell, Heart, RefreshCw, Target } from 'lucide-react';

const WorkoutResults = ({ workoutPlan, onReset }) => {
  const resultsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  if (!workoutPlan) {
    return null;
  }

  const { userInfo, exercises, cardio, recommendations } = workoutPlan;

  return (
    <motion.div
      variants={resultsVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[#0C0C0C]"
    >
      <div className="w-full max-w-4xl bg-gray-900/50 border border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Your Personalized <span className="text-[#B1F82A]">Workout Plan</span>
        </h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <CheckCircle className="mr-2" /> Your Profile
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-300">
              <p><strong>Gender:</strong> {userInfo.gender}</p>
              <p><strong>Age:</strong> {userInfo.age}</p>
              <p><strong>Weight:</strong> {userInfo.weight} kg</p>
              <p><strong>Height:</strong> {userInfo.height} cm</p>
              <p><strong>BMI:</strong> {userInfo.bmi}</p>
              <p><strong>Goal:</strong> {userInfo.goal}</p>
              <p><strong>Fitness Level:</strong> {userInfo.fitnessLevel}</p>
              <p><strong>Focus Areas:</strong> {userInfo.focusAreas.join(', ')}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <Target className="mr-2" /> Focused Strength Training
            </h3>
            <ul className="space-y-3 text-gray-300">
              {exercises.map((exercise, index) => (
                <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700 py-2 last:border-b-0">
                  <span className="font-semibold">{exercise.name}</span>
                  <span className="text-gray-400 text-sm sm:text-right">{exercise.sets} sets of {exercise.reps} ({exercise.rest} rest)</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <Heart className="mr-2" /> Cardio
            </h3>
            <ul className="space-y-3 text-gray-300">
              {cardio.map((c, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-b-0">
                  <span>{c.name}</span>
                  <span className="text-gray-400">{c.duration} ({c.intensity})</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-gray-800/70 p-6 rounded-2xl">
            <h3 className="text-2xl font-semibold text-[#B1F82A] mb-4 flex items-center">
              <RefreshCw className="mr-2" /> Recommendations
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-10 text-center">
          <Button
            onClick={onReset}
            className="px-8 py-4 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg"
          >
            Generate New Plan
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutResults;