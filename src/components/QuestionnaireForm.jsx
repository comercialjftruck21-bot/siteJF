import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Check, ChevronUp, ChevronDown, Dumbbell, Dumbbell as Barbell, GitBranch, Binary } from 'lucide-react';

const focusAreasData = [
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Arms',
    'Core',
];

const equipmentData = [
  { id: 'dumbbells', label: 'Dumbbells', icon: <Dumbbell className="w-5 h-5" /> },
  { id: 'barbell', label: 'Barbell', icon: <Barbell className="w-5 h-5" /> },
  { id: 'resistanceBands', label: 'Resistance Bands', icon: <GitBranch className="w-5 h-5" /> },
  { id: 'machine', label: 'Gym Machines', icon: <Binary className="w-5 h-5" /> },
];

const FocusAreaSelector = ({ selectedAreas, toggleArea, onNext }) => {
    return (
        <div className="w-full max-w-2xl bg-gray-900/50 border border-gray-800 rounded-3xl py-[64px] px-6 sm:px-8 lg:px-10 shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-8">
                Select areas to <span className="text-[#B1F82A]">focus on.</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
                {focusAreasData.map((area) => (
                    <motion.button
                        key={area}
                        onClick={() => toggleArea(area)}
                        className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full transition-all duration-300 transform
                            ${selectedAreas.includes(area)
                                ? 'bg-[#B1F82A] text-black border-transparent'
                                : 'bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20'
                            }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {selectedAreas.includes(area) ? <Check size={18} /> : <Plus size={18} />}
                        <span className="font-semibold">{area}</span>
                    </motion.button>
                ))}
            </div>
             <Button
              onClick={onNext}
              className="w-full sm:w-auto px-10 py-3 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg mt-4"
            >
              Next
            </Button>
        </div>
    );
};

const MeasurementInput = ({ label, value, onValueChange, unit, onUnitChange, units, stepValue = 1 }) => {
    const handleIncrement = () => {
        onValueChange((Number(value) + stepValue).toString());
    };

    const handleDecrement = () => {
        onValueChange(Math.max(0, (Number(value) - stepValue)).toString());
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-xl font-semibold text-gray-300">{label}</h3>
            <div className="flex items-center gap-4">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    className="w-48 text-center bg-transparent text-6xl font-bold text-white focus:outline-none appearance-none"
                    style={{MozAppearance: 'textfield'}}
                />
                <div className="flex flex-col gap-2">
                    <motion.button onClick={handleIncrement} className="p-2 bg-gray-700/50 rounded-full hover:bg-gray-600 transition-colors" whileTap={{ scale: 0.9 }}><ChevronUp size={24} /></motion.button>
                    <motion.button onClick={handleDecrement} className="p-2 bg-gray-700/50 rounded-full hover:bg-gray-600 transition-colors" whileTap={{ scale: 0.9 }}><ChevronDown size={24} /></motion.button>
                </div>
            </div>
            <div className="flex gap-2 bg-gray-800 p-1 rounded-full">
                {units.map(u => (
                    <button
                        key={u}
                        onClick={() => onUnitChange(u)}
                        className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${unit === u ? 'bg-[#B1F82A] text-black' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                        {u}
                    </button>
                ))}
            </div>
        </div>
    )
};

const BodyMeasurementForm = ({ formData, setFormData, onNext, onBack }) => {
    return (
        <div className="w-full max-w-2xl bg-gray-900/50 border border-gray-800 rounded-3xl py-[64px] px-6 sm:px-8 lg:px-10 shadow-2xl text-center">
             <h2 className="text-3xl font-bold text-white mb-12">
                Your <span className="text-[#B1F82A]">Measurements</span>
            </h2>
            <div className="flex flex-col md:flex-row justify-around items-center gap-12 my-8">
                <MeasurementInput
                    label="Your Weight"
                    value={formData.weight}
                    onValueChange={(val) => setFormData(prev => ({...prev, weight: val}))}
                    unit={formData.weightUnit}
                    onUnitChange={(unit) => setFormData(prev => ({...prev, weightUnit: unit}))}
                    units={['kg', 'lbs']}
                />
                <MeasurementInput
                    label="Your Height"
                    value={formData.height}
                    onValueChange={(val) => setFormData(prev => ({...prev, height: val}))}
                    unit={formData.heightUnit}
                    onUnitChange={(unit) => setFormData(prev => ({...prev, heightUnit: unit}))}
                    units={['cm', 'ft']}
                />
            </div>
            <div className="flex justify-between gap-4 mt-12">
                <Button type="button" onClick={onBack} className="flex-1 px-6 py-3 text-lg font-semibold rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300">Back</Button>
                <Button onClick={onNext} className="flex-1 px-10 py-3 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg">Next</Button>
            </div>
        </div>
    );
};

const UserDetailsForm = ({ formData, handleChange, handleSelectChange, handleSliderChange, handleCheckboxChange, handleSubmit, onBack }) => {
    return (
        <div className="w-full max-w-2xl bg-gray-900/50 border border-gray-800 rounded-3xl py-[64px] px-6 sm:px-8 lg:px-10 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Tell Us About <span className="text-[#B1F82A]">Yourself</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <Label htmlFor="age" className="text-gray-300">Age *</Label>
                    <Input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="e.g., 30"
                        className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 mt-2"
                    />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="goal" className="text-gray-300">Fitness Goal *</Label>
                        <Select name="goal" onValueChange={(value) => handleSelectChange('goal', value)} value={formData.goal}>
                            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white mt-2">
                                <SelectValue placeholder="Select your primary goal" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                <SelectItem value="flexibility">Flexibility</SelectItem>
                                <SelectItem value="endurance">Endurance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="fitnessLevel" className="text-gray-300">Current Fitness Level *</Label>
                        <Select name="fitnessLevel" onValueChange={(value) => handleSelectChange('fitnessLevel', value)} value={formData.fitnessLevel}>
                            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white mt-2">
                                <SelectValue placeholder="Select your fitness level" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 text-white border-gray-700">
                                <SelectItem value="beginner">Beginner</SelectItem>
                                <SelectItem value="intermediate">Intermediate</SelectItem>
                                <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div>
                    <Label htmlFor="daysPerWeek" className="flex justify-between items-center text-gray-300">
                        <span>Workout Days Per Week</span>
                        <span className="text-[#B1F82A] font-bold text-lg">{formData.daysPerWeek}</span>
                    </Label>
                    <Slider
                        id="daysPerWeek"
                        min={1}
                        max={7}
                        step={1}
                        value={[formData.daysPerWeek]}
                        onValueChange={handleSliderChange}
                        className="mt-4"
                    />
                </div>

                <div>
                    <Label className="text-gray-300 mb-4 block">Available Equipment</Label>
                    <div className="flex flex-col gap-4">
                        {equipmentData.map(item => (
                            <label
                                key={item.id}
                                htmlFor={item.id}
                                className={`flex items-center gap-3 p-4 rounded-lg border transition-all duration-300 cursor-pointer ${formData.equipment[item.id] ? 'bg-[#B1F82A]/10 border-[#B1F82A]' : 'bg-gray-800/80 border-gray-700 hover:border-gray-600'
                                    }`}
                            >
                                <Checkbox
                                    id={item.id}
                                    checked={formData.equipment[item.id]}
                                    onCheckedChange={(checked) => handleCheckboxChange(item.id, checked)}
                                    className="hidden"
                                />
                                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-300 ${formData.equipment[item.id] ? 'bg-[#B1F82A] border-[#B1F82A]' : 'border-gray-500'
                                    }`}>
                                    {formData.equipment[item.id] && <Check className="w-4 h-4 text-black" />}
                                </div>
                                <div className={`flex items-center gap-2 text-sm font-medium ${formData.equipment[item.id] ? 'text-white' : 'text-gray-300'}`}>
                                    {item.icon}
                                    {item.label}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between gap-4 mt-10">
                    <Button type="button" onClick={onBack} className="flex-1 px-6 py-3 text-lg font-semibold rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-all duration-300">Back</Button>
                    <Button type="submit" className="flex-1 px-6 py-3 text-lg font-semibold rounded-full bg-[#B1F82A] text-black hover:bg-[#B1F82A]/90 transition-all duration-300 shadow-lg">Generate Workout</Button>
                </div>
            </form>
        </div>
    );
};

const QuestionnaireForm = ({ onComplete, onBack, initialGender }) => {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        weight: '70',
        weightUnit: 'kg',
        height: '175',
        heightUnit: 'cm',
        goal: '',
        fitnessLevel: '',
        daysPerWeek: 3,
        equipment: {
            dumbbells: false,
            barbell: false,
            resistanceBands: false,
            machine: false,
        },
        focusAreas: [],
    });

    useEffect(() => {
        if (initialGender) {
            setFormData(prev => ({ ...prev, gender: initialGender }));
        }
    }, [initialGender]);

    const handleNextStep = () => {
        if (step === 1 && formData.focusAreas.length === 0) {
            toast({
                variant: "destructive",
                title: "Select at least one area.",
                description: "Please choose which body parts you want to focus on.",
            });
            return;
        }
        if (step === 2 && (!formData.weight || !formData.height || parseFloat(formData.weight) <= 0 || parseFloat(formData.height) <= 0)) {
            toast({
                variant: "destructive",
                title: "Invalid measurements.",
                description: "Please enter a valid weight and height.",
            });
            return;
        }
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => setStep(prev => prev - 1);

    const toggleFocusArea = (area) => {
        setFormData((prev) => {
            const newFocusAreas = prev.focusAreas.includes(area)
                ? prev.focusAreas.filter((a) => a !== area)
                : [...prev.focusAreas, area];
            return { ...prev, focusAreas: newFocusAreas };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (value) => {
        setFormData((prev) => ({ ...prev, daysPerWeek: value[0] }));
    };

    const handleCheckboxChange = (name, checked) => {
        setFormData((prev) => ({
            ...prev,
            equipment: { ...prev.equipment, [name]: checked },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { age, goal, fitnessLevel } = formData;
        if (!age || !goal || !fitnessLevel) {
            toast({
                variant: "destructive",
                title: "Please fill in all required fields.",
                description: "All fields marked with * are mandatory.",
            });
            return;
        }
        onComplete(formData);
    };

    const formVariants = {
        hidden: { opacity: 0, x: '100%' },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
        exit: { opacity: 0, x: '-100%', transition: { duration: 0.5, ease: "easeInOut" } },
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-[120px] px-4 sm:px-6 lg:px-8 bg-[#0C0C0C] overflow-hidden">
             <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full flex justify-center"
                    >
                        <FocusAreaSelector
                            selectedAreas={formData.focusAreas}
                            toggleArea={toggleFocusArea}
                            onNext={handleNextStep}
                        />
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div
                        key="step2"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full flex justify-center"
                    >
                        <BodyMeasurementForm
                            formData={formData}
                            setFormData={setFormData}
                            onNext={handleNextStep}
                            onBack={handlePrevStep}
                        />
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div
                        key="step3"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full flex justify-center"
                    >
                        <UserDetailsForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSelectChange={handleSelectChange}
                            handleSliderChange={handleSliderChange}
                            handleCheckboxChange={handleCheckboxChange}
                            handleSubmit={handleSubmit}
                            onBack={handlePrevStep}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuestionnaireForm;