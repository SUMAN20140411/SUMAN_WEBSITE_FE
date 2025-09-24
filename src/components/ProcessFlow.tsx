import React from 'react';
import { motion } from "framer-motion";
import { FlowCard } from './FlowCard';
import { FlowDiamond } from './FlowDiamond';
import { FlowArrow } from './FlowArrow';
import { NGBox } from './NGBox';
import { processFlowContent } from '../data/ProcessFlow';
import { useLangStore } from '../stores/langStore';

const ProcessFlow = () => {
  const lang = useLangStore((state) => state.lang);
  const content = processFlowContent[lang];
  const steps = content.steps;

  // Helper function to find step index by id
  const findStepIndex = (id: string) => {
    return steps.findIndex(step => step.id === id);
  };

  // Helper function to calculate NG arrow distance
  const calculateNGDistance = (fromIndex: number, toIndex: number) => {
    const distance = Math.abs(fromIndex - toIndex) * 200;
    return Math.max(distance, 120);
  };

  // Tech animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const ngArrowVariants = {
    hidden: { 
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <div className="w-full bg-white overflow-x-auto">
      {/* Animated background tech grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1633]/20 via-transparent to-[#1B2B57]/20"></div>
        <motion.div 
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 98%, rgba(10, 22, 51, 0.1) 100%),
              linear-gradient(transparent 98%, rgba(10, 22, 51, 0.1) 100%)
            `,
            backgroundSize: "50px 50px"
          }}
        />
      </div>

      {/* Main container with proper spacing */}
      <motion.div 
        className="min-w-[1800px] p-8 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Flow Track */}
        <div className="flex items-center gap-8 mb-16">
          
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Component */}
              <motion.div 
                className="relative"
                variants={stepVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                {step.type === 'card' ? (
                  <FlowCard 
                    title={step.title}
                    subtitle={step.subtitle}
                    variant={step.isPartner ? "navy" : "light"}
                    size={step.isPartner ? "sm" : "md"}
                  />
                ) : (
                  <FlowDiamond 
                    title={step.title}
                    subtitle={step.subtitle}
                  />
                )}
                
                {/* NG Box and Arrow - Only for D/R and Partner */}
                {step.hasNG && (
                  <motion.div 
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <NGBox />
                    
                    {/* NG Arrow routing */}
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2">
                      {step.id === 'dr' && (
                        // D/R NG Arrow to Concept Design (like the first image)
                        <motion.div 
                          className="flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <motion.div 
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                          />
                          <motion.div 
                            className="h-1 bg-[#EF4444]"
                            style={{ 
                              width: `${calculateNGDistance(index, findStepIndex('concept'))}px` 
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 2.3, duration: 0.3 }}
                          />
                          <motion.div 
                            className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-transparent border-r-[#EF4444] -ml-1"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 2.6, duration: 0.3, type: "spring" }}
                          />
                        </motion.div>
                      )}
                      
                      {step.id === 'partner' && (
                        // Partner NG Arrow to PO
                        <motion.div 
                          className="flex items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 }}
                        >
                          <motion.div 
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                          />
                          <motion.div 
                            className="h-1 bg-[#EF4444]"
                            style={{ 
                              width: `${calculateNGDistance(index, findStepIndex('po'))}px` 
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.8, ease: "easeInOut" }}
                          />
                          <motion.div 
                            className="w-0.5 h-8 bg-[#EF4444]"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 2.3, duration: 0.3 }}
                          />
                          <motion.div 
                            className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[10px] border-transparent border-r-[#EF4444] -ml-1"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 2.6, duration: 0.3, type: "spring" }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
              
              {/* Arrow between steps */}
              {index < steps.length - 1 && !step.arrowsTo && (
                <motion.div
                  variants={stepVariants}
                  whileHover={{ scale: 1.1 }}
                >
                  <FlowArrow />
                </motion.div>
              )}
              
              {/* Special arrow from 수입검사 to 협력사 */}
              {step.arrowsTo && (
                <motion.div
                  variants={stepVariants}
                  className="flex flex-col items-center"
                >
                  <motion.div 
                    className="w-0.5 h-16 bg-[#1B2B57]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                  <motion.div 
                    className="w-16 h-0.5 bg-[#1B2B57]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  />
                  <motion.div 
                    className="w-0.5 h-16 bg-[#1B2B57]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                  />
                  <motion.div 
                    className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-transparent border-t-[#1B2B57] -mt-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2, duration: 0.3, type: "spring" }}
                  />
                </motion.div>
              )}
              
              {/* Return arrow for re-order step */}
              {step.returnTo && (
                <motion.div 
                  className="relative ml-8"
                  variants={stepVariants}
                >
                  <FlowArrow />
                  <motion.div 
                    className="absolute left-8 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <div className="flex flex-col items-center">
                      <motion.div 
                        className="w-0.5 h-12 bg-[#1B2B57]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 1.5, duration: 0.4 }}
                      />
                      <motion.div 
                        className="w-[1400px] h-0.5 bg-[#1B2B57]"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 1.9, duration: 1.2, ease: "easeInOut" }}
                      />
                      <motion.div 
                        className="w-0.5 h-12 bg-[#1B2B57]"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 3.1, duration: 0.4 }}
                      />
                      <motion.div 
                        className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-transparent border-t-[#1B2B57] -mt-3"
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 3.5, duration: 0.3, type: "spring" }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export { ProcessFlow };