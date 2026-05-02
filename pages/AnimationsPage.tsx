import { useState } from "react";
import { Card } from "../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star, Check, Loader2, ArrowRight, TrendingUp, MousePointer } from "lucide-react";
import { Button } from "../components/ui/button";
import { ComponentShowcase } from "../components/ui/componentshowcase";

// Animation props constants
const hoverScaleProps = { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };
const hoverRotateProps = { whileHover: { rotate: 5 }, whileTap: { rotate: -5 } };
const hoverLiftProps = { whileHover: { y: -5 } };
const hoverShadowProps = { whileHover: { boxShadow: "var(--shadow-elevation-3)" } };
const dragProps = { drag: true, dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 }, dragElastic: 0.2 };

function AnimationPlayground() {
  const [isLiked, setIsLiked] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-6">
      {/* Basic Animations */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Basic Animations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="p-4 text-center bg-muted"><ArrowRight className="size-5 mx-auto mb-2 rotate-180" /><p className="text-xs font-medium">Slide Left</p></Card>
          </motion.div>
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="p-4 text-center bg-muted"><ArrowRight className="size-5 mx-auto mb-2" /><p className="text-xs font-medium">Slide Right</p></Card>
          </motion.div>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <Card className="p-6 bg-accent border-accent flex items-center justify-center"><Star className="size-8 text-chart-3" /></Card>
          </motion.div>
          <motion.div initial={{ rotate: -180, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
            <Card className="p-6 bg-muted border-primary flex items-center justify-center"><Loader2 className="size-8 text-primary" /></Card>
          </motion.div>
        </div>
      </div>

      {/* Microinteractions */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Microinteractions</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <motion.button className="relative p-4 rounded-lg bg-muted hover:bg-muted transition-colors" whileTap={{ scale: 0.9 }} onClick={() => setIsLiked(!isLiked)}>
            <motion.div animate={isLiked ? { scale: [1, 1.3, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
              <Heart className={`size-8 transition-colors ${isLiked ? "fill-red-500 text-destructive" : "text-muted-foreground"}`} />
            </motion.div>
          </motion.button>

          <motion.button className="flex items-center gap-3 p-4 rounded-lg bg-muted hover:bg-muted transition-colors" onClick={() => setIsChecked(!isChecked)}>
            <div className={`size-6 rounded border-2 flex items-center justify-center transition-colors ${isChecked ? "bg-primary border-primary" : "border-muted-foreground"}`}>
              <AnimatePresence mode="wait">
                {isChecked && (
                  <motion.div key="check" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 180 }} transition={{ duration: 0.3 }}>
                    <Check className="size-4 text-primary-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-sm font-medium">{isChecked ? "Done" : "Pending"}</span>
          </motion.button>

          <div className="flex items-center gap-4">
            <Button onClick={() => setCount(count + 1)} size="sm">+1</Button>
            <AnimatePresence mode="wait">
              <motion.div key={count} initial={{ scale: 1.5, opacity: 0, y: -20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.5, opacity: 0, y: 20 }} transition={{ duration: 0.3 }} className="text-3xl font-bold text-primary min-w-[2rem] text-center">{count}</motion.div>
            </AnimatePresence>
            <Button variant="outline" onClick={() => setCount(0)} size="sm">Reset</Button>
          </div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Hover Effects</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div {...hoverScaleProps} className="p-6 rounded-lg bg-muted border border-border cursor-pointer text-center"><p className="text-sm font-medium">Scale</p></motion.div>
          <motion.div {...hoverRotateProps} className="p-6 rounded-lg bg-muted border border-border cursor-pointer text-center"><p className="text-sm font-medium">Rotate</p></motion.div>
          <motion.div {...hoverLiftProps} className="p-6 rounded-lg bg-accent border border-border cursor-pointer text-center"><p className="text-sm font-medium">Lift</p></motion.div>
          <motion.div {...hoverShadowProps} className="p-6 rounded-lg bg-muted border border-border cursor-pointer text-center"><p className="text-sm font-medium">Shadow</p></motion.div>
        </div>
      </div>

      {/* Loaders */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Loading States</h3>
        <div className="flex gap-6 flex-wrap items-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><Loader2 className="size-8 text-primary" /></motion.div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="size-8 rounded-full bg-chart-2" />
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (<motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }} className="size-3 rounded-full bg-chart-3" />))}
          </div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden"><motion.div className="h-full bg-primary rounded-full" animate={{ x: ["-100%", "200%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} /></div>
        </div>
      </div>

      {/* Drag */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Draggable</h3>
        <div className="flex gap-4 flex-wrap">
          <motion.div {...dragProps} className="p-6 rounded-lg bg-muted border-border cursor-grab active:cursor-grabbing text-center">
            <MousePointer className="size-6 mx-auto mb-2 text-primary" /><p className="text-xs font-medium">Drag me!</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function AnimationsPage() {
  return (
    <ComponentShowcase
      title="Animations & Microinteractions"
      description="Complete animation showcase using motion/react (Motion library). Includes basic animations (fade, slide, scale, rotate), microinteractions (like button, animated checkbox, counter), hover effects, loading states (spinner, pulse, dots, progress bar), draggable elements, SVG path animations, stagger children, and the full Animation System architecture (components, hooks, skeleton variants, CSS utilities)."
      category="Design System"
      preview={<AnimationPlayground />}
      code={`import { motion, AnimatePresence } from "framer-motion";

// Fade In
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
  Content
</motion.div>

// Slide In
<motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
  From Left
</motion.div>

// Scale
<motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }}>
  Zoom In
</motion.div>

// Hover + Tap
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  Interactive
</motion.div>

// AnimatePresence for exit animations
<AnimatePresence mode="wait">
  <motion.div key={id} exit={{ opacity: 0 }} />
</AnimatePresence>`}
      props={[
        { name: "initial", type: "MotionStyle", description: "Starting animation state (opacity, x, y, scale, rotate)." },
        { name: "animate", type: "MotionStyle", description: "Target animation state." },
        { name: "exit", type: "MotionStyle", description: "Exit animation state (requires AnimatePresence parent)." },
        { name: "transition", type: "Transition", description: "Duration, delay, ease, repeat configuration." },
        { name: "whileHover", type: "MotionStyle", description: "Animation state while hovering." },
        { name: "whileTap", type: "MotionStyle", description: "Animation state while pressing." },
        { name: "drag", type: "boolean | 'x' | 'y'", description: "Enable dragging (all directions, x-only, or y-only)." },
        { name: "variants", type: "Record<string, MotionStyle>", description: "Named animation states for orchestration and stagger." },
      ]}
      examples={[
        {
          title: "Scroll-triggered Animation",
          description: "Elements animate when they enter the viewport using whileInView.",
          preview: (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <motion.div key={item} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: item * 0.1 }} className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-chart-2/10 border flex items-center gap-3">
                  <TrendingUp className="size-5 text-primary" />
                  <span className="font-medium">Item {item} - Appears on scroll</span>
                </motion.div>
              ))}
            </div>
          ),
          code: `<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
>
  Appears on scroll
</motion.div>`,
        },
      ]}
    />
  );
}