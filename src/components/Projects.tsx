import { FC } from 'react';
import '../styles/Projects.css';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: { text: string; url: string }[];
}

const projects: Project[] = [
  {
    title: "u/haikusbot",
    description: "Developed the #1 most popular Reddit bot of all time, with over 5 million karma and counting.",
    image: "images/haikusbot.png",
    tags: ["Bot", "Python"],
    links: [
      { text: "View on Reddit", url: "https://www.reddit.com/user/haikusbot/?sort=top" }
    ]
  },
  {
    title: "StarCraft 2 Bot",
    description: "Developed a reinforcement learning bot that discovers macro strategies in StarCraft 2 using SARSA. It improved its win rate by 6% after only 1 day of training against the in-game Hard AI.",
    image: "images/sc2.png",
    tags: ["AI", "Bot", "Python"],
    links: [
      { text: "GitHub", url: "https://github.com/WilliamSongLiu/CS238-SC2" },
      { text: "Video", url: "https://youtu.be/yBSRBRXVGvo" }
    ]
  },
  {
    title: "League of Legends Bot",
    description: "Developed an CV bot that dodges skillshots in League of Legends using Segment Anything Model (SAM). Heuristic-based image segmentation allows the bot to run at 20 FPS and dodge skillshots in real time, surpassing traditional object detection techniques like YOLO.",
    image: "images/lol.png",
    tags: ["AI", "Bot", "Python"],
    links: [
      { text: "Video", url: "https://youtu.be/zyk_REagx-4" }
    ]
  },
  {
    title: "LLM Jailbreaking Competitions",
    description: "Developed an automated LLM prompt optimization factory to discover jailbreaks in GPT-4o and Claude 3.5 Sonnet-based AI agents, winning 2 competitions.",
    image: "images/jailbreak.jpg",
    tags: ["AI", "LLM", "Prompt Engineering"],
    links: []
  },
  {
    title: "Visual Novel Generator",
    description: "Developed a visual novel that generates its story on-the-fly based on player choices, offering a first-of-its-kind experience with infinitely branching narratives. Everything from dialogue, choices, characters, imagery, and voiceovers are generated dynamically using AI.",
    image: "images/vn.png",
    tags: ["AI", "LLM", "Unity", "C#"],
    links: []
  },
  {
    title: "Cloudy Paws",
    description: "Developed a puzzle game about a dog trying to find his way back to his owner.",
    image: "images/cloudy.png",
    tags: ["Game Dev", "Unity", "C#"],
    links: [
      { text: "Play", url: "https://wliu.itch.io/cloudy-paws" }
    ]
  },
  {
    title: "Witch Simulator",
    description: "Developed a VR game where the player is a witch, brewing potions to fulfill her customer's orders.",
    image: "images/witch.png",
    tags: ["Game Dev", "VR", "Unity", "C#"],
    links: [
      { text: "Video", url: "https://youtu.be/_FScZjSh7xo" }
    ]
  },
  {
    title: "DATALPHA",
    description: "Developed a data aggregator and analysis platform for NFT traders, beloved by thousands of users.",
    image: "images/datalpha.png",
    tags: ["Web3", "React.js", "Express.js"],
    links: [
      { text: "Open Website", url: "https://datalpha.xyz/" }
    ]
  },
  {
    title: "Discord Bots",
    description: "Developed Discord bots as a freelancer in high school, providing moderation tools and games to over 50 Discord communities.",
    image: "images/discord.png",
    tags: ["Bot", "Node.js"],
    links: []
  },
  {
    title: "Penetration Testing",
    description: "Discovered and reported 2 critical vulnerabilities in browser-based MMO Torn, earning $1,000 in bug bounties in high school.",
    image: "images/torn.png",
    tags: ["Penetration Testing", "PHP"],
    links: []
  },
];

const Projects: FC = () => {
  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div key={index} className={`project-item ${index % 2 === 0 ? 'image-right' : 'image-left'}`}>
            <div className="project-content">
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                {project.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
            <div className="project-image-container">
              <img src={project.image} alt={project.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;