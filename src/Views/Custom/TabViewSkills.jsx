import { AnimatePresence, motion, useTransform } from 'framer-motion'
import Icon from '../Layout/Icons/Icon'
import { staggerContainer, iconItem } from '../animations'
import './TabViewSkills.css'

const TABS = [
  {
    label: 'Frontend',
    icons: [
      { name: 'js',         title: 'Javascript'    },
      { name: 'react',      title: 'ReactJs'       },
      { name: 'angular',    title: 'Angular (8+)'  },
      { name: 'ionic',      title: 'Ionic'         },
      { name: 'html',       title: 'HTML'          },
      { name: 'css',        title: 'CSS'           },
    ]
  },
  {
    label: 'Backend',
    icons: [
      { name: 'java',       title: 'Java'          },
      { name: 'spring',     title: 'Spring MVC'    },
      { name: 'springboot', title: 'Springboot'    },
      { name: 'nest',       title: 'Nest'          },
      { name: 'python',     title: 'Python / Django'},
      { name: 'dotnet',     title: '.NET MVC'      },
    ]
  },
  {
    label: 'Databases',
    icons: [
      { name: 'mongo',      title: 'MongoDB'       },
      { name: 'mysql',      title: 'My SQL'        },
      { name: 'postgres',   title: 'postgreSQL'    },
      { name: 'sqlserver',  title: 'MS SQL Server' },
      { name: 'oracle',     title: 'PL-SQL'        },
    ]
  },
  {
    label: 'Tools',
    icons: [
      { name: 'vscode',     title: 'VS Code'       },
      { name: 'intellij',   title: 'IntelliJ Idea' },
      { name: 'github',     title: 'Github'        },
      { name: 'dbeaver',    title: 'Dbeaver DB Client' },
      { name: 'postman',    title: 'Postman'       },
    ]
  },
]

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  },
  exit: { opacity: 0, transition: { duration: 0.18 } }
}

export default function TabViewSkills({ mode, activeIndex = 0, scrollProgress }) {
  const tab = TABS[activeIndex]
  const barWidth = useTransform(scrollProgress, [0, 1], ['0%', '100%'])

  return (
    <div className={`tab-container tab-container-${mode}`}>

      {/* ── Tab headers (display only — scroll drives active state) ── */}
      <div className={`skills-tab-nav skills-tab-nav-${mode}`}>
        {TABS.map((t, i) => (
          <div
            key={i}
            className={`skills-tab-btn skills-tab-btn-${mode}${i === activeIndex ? ' active' : ''}`}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* ── Tab content with AnimatePresence ── */}
      <div className="skills-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={`icon-grid ${mode}-icon-text`}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {tab.icons.map((icon) => (
              <motion.div key={icon.name} variants={iconItem}>
                <Icon name={icon.name} title={icon.title} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Scroll hint ── */}
      <p className={`skills-scroll-hint skills-scroll-hint-${mode}`}>
        Scroll to explore &nbsp;{activeIndex + 1} / {TABS.length}
      </p>

      {/* ── Bottom progress loader — fills as you scroll through all tabs ── */}
      <div className={`skills-loader-track skills-loader-track-${mode}`}>
        <motion.div className="skills-loader-fill" style={{ width: barWidth }} />
      </div>

    </div>
  )
}
