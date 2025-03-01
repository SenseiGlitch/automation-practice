import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import {
  Crosshair,
  Download,
  Image as ImageIcon,
  Sliders,
  Keyboard,
  Mouse,
  Box,
  Table,
  MousePointerClick,
  UploadCloud,
  LayoutPanelLeft,
  AlertCircle,
  CheckSquare,
  Calendar,
  MoveHorizontal,
  Timer,
  Monitor,
  Trophy,
  LocateFixed,
  Component,
  Settings,
  TestTube2,
  Bot
} from 'lucide-react';

const moduleGroups = [
  {
    title: 'Locator Strategies',
    description: 'Master element identification techniques',
    icon: Crosshair,
    modules: [
      {
        title: 'Traditional Locators',
        description: 'Practice ID, class, XPath, and CSS selectors',
        icon: LocateFixed,
        path: '/modules/locators',
        key: 'locators'
      },
      {
        title: 'Relative Locators',
        description: 'Learn near, above, below, and to-the-right-of selectors',
        icon: MousePointerClick,
        path: '/modules/relative-locators',
        key: 'relative-locators'
      },
      {
        title: 'Shadow DOM',
        description: 'Handle web components and shadow root elements',
        icon: Box,
        path: '/modules/shadow-dom',
        key: 'shadow-dom'
      },
    ]
  },
  {
    title: 'UI Components',
    description: 'Practice common web component interactions',
    icon: Component,
    modules: [
      {
        title: 'Dynamic Tables',
        description: 'Sort, filter, and validate table data',
        icon: Table,
        path: '/modules/tables',
        key: 'tables'
      },
      {
        title: 'Forms',
        description: 'Input fields, dropdowns, checkboxes, and validation',
        icon: CheckSquare,
        path: '/modules/form-elements',
        key: 'forms'
      },
      {
        title: 'Calendar',
        description: 'Date pickers and range selection',
        icon: Calendar,
        path: '/modules/calendar',
        key: 'calendar'
      },
      {
        title: 'Slider',
        description: 'Range controls and value validation',
        icon: Sliders,
        path: '/modules/slider',
        key: 'slider'
      },
      {
        title: 'Alerts',
        description: 'Handle browser dialogs and popups',
        icon: AlertCircle,
        path: '/modules/alerts',
        key: 'alerts'
      },
    ]
  },
  {
    title: 'Input Methods',
    description: 'Master user interaction techniques',
    icon: Settings,
    modules: [
      {
        title: 'Keyboard Actions',
        description: 'Key combinations and modifier keys',
        icon: Keyboard,
        path: '/modules/keyboard-actions',
        key: 'keyboard-actions'
      },
      {
        title: 'Mouse Actions',
        description: 'Clicks, hover, drag-and-drop, right-click',
        icon: Mouse,
        path: '/modules/mouse-actions',
        key: 'mouse-actions'
      },
      {
        title: 'Hover Effects',
        description: 'Test hover states and tooltips',
        icon: MoveHorizontal,
        path: '/modules/hover',
        key: 'hover'
      },
      {
        title: 'Drag & Drop',
        description: 'Element repositioning and drop zones',
        icon: MoveHorizontal,
        path: '/modules/drag-drop',
        key: 'drag-drop'
      },
    ]
  },
  {
    title: 'File Handling',
    description: 'Work with file system interactions',
    icon: UploadCloud,
    modules: [
      {
        title: 'File Upload',
        description: 'Validate file selection and uploads',
        icon: UploadCloud,
        path: '/modules/file-upload',
        key: 'file-upload'
      },
      {
        title: 'Download File',
        description: 'Verify downloads and file integrity',
        icon: Download,
        path: '/modules/download-file',
        key: 'download-file'
      },
      {
        title: 'Broken Image',
        description: 'Detect and handle missing assets',
        icon: ImageIcon,
        path: '/modules/broken-image',
        key: 'broken-image'
      },
    ]
  },
  {
    title: 'Advanced Topics',
    description: 'Complex scenarios and edge cases',
    icon: TestTube2,
    modules: [
      {
        title: 'Waits',
        description: 'Explicit, implicit, and fluent wait strategies',
        icon: Timer,
        path: '/modules/waits',
        key: 'waits'
      },
      {
        title: 'Multi-Window',
        description: 'Handle tabs and window management',
        icon: Monitor,
        path: '/modules/multi-window',
        key: 'windows'
      },
      {
        title: 'Iframes',
        description: 'Work with nested document contexts',
        icon: LayoutPanelLeft,
        path: '/modules/iframes',
        key: 'iframes'
      },
    ]
  },
  {
    title: 'Challenges',
    description: 'Test your comprehensive skills',
    icon: Trophy,
    modules: [
      {
        title: 'Final Challenge',
        description: 'End-to-end testing scenario combining all concepts',
        icon: Trophy,
        path: '/modules/end-to-end',
        key: 'end-to-end'
      }
    ]
  }
];

export default function Home() {
  return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-16 text-center animate-fade-in">
            <div className="inline-flex items-center gap-3 mb-4">
              <Bot className="h-12 w-12 text-emerald-400 animate-bounce" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                Quality Sensei
              </h1>
            </div>
            <div className="text-2xl text-slate-300 mb-6 font-medium">
              🤖 Hey there! I'm Sensei Glitch at your service! 🎯
            </div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Let's level up your automation skills together! Start your testing journey with our interactive modules.
              Each practice session brings you closer to mastering test automation! ✨
            </p>
          </div>

          {/* Module Groups */}
          <div className="space-y-16">
            {moduleGroups.map((group) => (
                <section key={group.title} className="space-y-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-slate-800 rounded-lg">
                      <group.icon className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-100">{group.title}</h2>
                      <p className="text-slate-400">{group.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.modules.map((module) => (
                        <Link key={module.path} href={module.path}>
                          <Card className={`group h-48 flex flex-col justify-between p-6 cursor-pointer transition-all duration-300
                      bg-slate-800 hover:bg-slate-800/90 border border-slate-700
                      hover:border-emerald-400/30 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]
                      relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                              <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-emerald-500/20 transition-colors mb-4">
                                <module.icon className="h-6 w-6 text-emerald-400" />
                              </div>
                              <h3 className="text-lg font-semibold text-slate-100 mb-2">
                                {module.title}
                              </h3>
                              <p className="text-slate-400 text-sm line-clamp-2 px-2">
                                {module.description}
                              </p>
                            </div>

                            <div className="relative z-10 mt-auto text-center">
                              <div className="text-xs text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                Start Practice →
                              </div>
                            </div>
                          </Card>
                        </Link>
                    ))}
                  </div>
                </section>
            ))}
          </div>
        </div>
      </div>
  );
}