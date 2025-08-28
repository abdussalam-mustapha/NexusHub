import './NetworkingFeed.css'
import Sidebar from '../shared/Sidebar'
import TopNav from '../shared/TopNav'
import { User, Heart, MessageCircle, Share2, Image, Video, Plus } from 'lucide-react'

function NetworkingFeed() {
  const posts = [
    {
      id: 1,
      author: {
        name: "Alice Johnson",
        title: "Senior Software Engineer at TechCorp",
        time: "2h ago",
        avatar: ""
      },
      content: "Just wrapped up an amazing project on distributed systems! The team did incredible work. Always learning something new in this field.",
      hashtags: ["#DistributedSystems", "#SoftwareDevelopment"],
      image: "/api/placeholder/600/300",
      stats: {
        likes: 194,
        comments: 23,
        shares: 11
      }
    },
    {
      id: 2,
      author: {
        name: "Bob Williams",
        title: "Marketing Director at Global Innovations",
        time: "7h ago",
        avatar: ""
      },
      content: "Excited to share insights from our latest market analysis report. Data-driven strategies are key to success! What are your thoughts on current market trends?",
      hashtags: ["#Marketing", "#MarketAnalysis", "#BusinessStrategy"],
      stats: {
        likes: 88,
        comments: 15,
        shares: 7
      }
    },
    {
      id: 3,
      author: {
        name: "Charlie Davis",
        title: "Product Manager at Innovate Solutions",
        time: "1d ago",
        avatar: ""
      },
      content: "Our new product feature is live! Huge shoutout to the engineering and design teams for their hard work and dedication. Check it out and let us know your feedback!",
      hashtags: ["#ProductLaunch", "#Innovation", "#Teamwork"],
      image: "/api/placeholder/600/200",
      stats: {
        likes: 210,
        comments: 45,
        shares: 18
      }
    }
  ]

  const suggestions = [
    { name: "Sarah Lee", title: "UX Designer" },
    { name: "David Kim", title: "Data Scientist" },
    { name: "Emily Chen", title: "Project Manager" }
  ]

  const jobs = [
    {
      title: "Full Stack Developer",
      company: "Alpha Systems",
      location: "Remote",
      time: "Full-time"
    },
    {
      title: "Content Strategist",
      company: "Beta Corp",
      location: "New York",
      time: "Part-time"
    },
    {
      title: "Junior Data Analyst",
      company: "Analytics Hub",
      location: "San Francisco",
      time: "Full-time"
    }
  ]

  const events = [
    {
      title: "AI in Business Summit",
      date: "October 28, 2024",
      location: "Virtual",
      type: "Conference"
    },
    {
      title: "Networking Mixer: Tech Industry",
      date: "November 10, 2024",
      location: "London, UK",
      type: "Social"
    },
    {
      title: "Blockchain Fundamentals Workshop",
      date: "December 5, 2024",
      location: "Online",
      type: "Workshop"
    }
  ]

  return (
    <div className="networking-feed">
      <Sidebar activeSection="feed" />
      <TopNav title="Networking Feed" />
      
      
    </div>
  )
}

export default NetworkingFeed
