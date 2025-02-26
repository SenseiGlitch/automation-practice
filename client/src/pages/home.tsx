import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { 
  MousePointerClick, 
  LayoutPanelLeft,
  AlertCircle,
  CheckSquare,
  Calendar,
  MousePointer,
  MoveHorizontal,
  Timer,
  Monitor,
  Bot,
  UploadCloud,
  Layers,
  Trophy
} from 'lucide-react';

const modules = [
  {
    title: 'Locators',
    description: 'Practice element locator strategies',
    icon: MousePointerClick,
    path: '/modules/locators',
    key: 'locators'
  },
  {
    title: 'Relative Locators',
    description: 'Learn how to use relative locators in Selenium 4',
    icon: Layers,
    path: '/modules/relative-locators',
    key: 'relative-locators'
  },
  {
    title: 'File Upload',
    description: 'Test file upload functionality',
    icon: UploadCloud, // Use a file upload icon
    path: '/modules/file-upload',
    key: 'file-upload'
  },
  {
    title: 'Iframes',
    description: 'Handle iframe interactions',
    icon: LayoutPanelLeft,
    path: '/modules/iframes',
    key: 'iframes'
  },
  {
    title: 'Alerts',
    description: 'Work with browser alerts',
    icon: AlertCircle,
    path: '/modules/alerts',
    key: 'alerts'
  },
  {
    title: 'Forms',
    description: 'Interact with form controls',
    icon: CheckSquare,
    path: '/modules/form-elements',
    key: 'forms'
  },
  {
    title: 'Calendar',
    description: 'Test date picker components',
    icon: Calendar,
    path: '/modules/calendar',
    key: 'calendar'
  },
  {
    title: 'Hover',
    description: 'Handle hover interactions',
    icon: MousePointer,
    path: '/modules/hover',
    key: 'hover'
  },
  {
    title: 'Drag & Drop',
    description: 'Practice drag and drop operations',
    icon: MoveHorizontal,
    path: '/modules/drag-drop',
    key: 'drag-drop'
  },
  {
    title: 'Waits',
    description: 'Learn different wait strategies',
    icon: Timer,
    path: '/modules/waits',
    key: 'waits'
  },
  {
    title: 'Windows',
    description: 'Handle multiple windows/tabs',
    icon: Monitor,
    path: '/modules/multi-window',
    key: 'windows'
  },
  {
    title: 'Final Challenge',
    description: 'Complete end-to-end testing scenario',
    icon: Trophy,
    path: '/modules/end-to-end',
    key: 'end-to-end'
  }
];

export default function Home() {
  const { progress } = useStore();

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <Bot className="h-12 w-12 text-emerald-400 animate-bounce" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Quality Sensei
            </h1>
          </div>
          <div className="cyber-text text-2xl text-slate-300 mb-6">
            🤖 Hey there! I'm Sensei Glitch at your service! 🎯
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Let's level up your automation skills together! Start your testing journey with our interactive modules. 
            Each practice session brings you closer to mastering test automation! ✨
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.path} href={module.path}>
              <Card className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 
                bg-slate-800 hover:bg-slate-800/80 border-slate-700
                hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-emerald-500/50
                cyber-border`}>
                <div className="flex items-start gap-4">
                  <module.icon className="h-8 w-8 text-slate-400" />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100 mb-2">{module.title}</h2>
                    <p className="text-slate-400">{module.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
