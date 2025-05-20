import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { MessageCircle, Users, TrendingUp, Brain, Settings, BarChart3, Calendar, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample data for charts
  const usageData = [
    { day: 'Mon', questions: 45, users: 23 },
    { day: 'Tue', questions: 52, users: 28 },
    { day: 'Wed', questions: 38, users: 19 },
    { day: 'Thu', questions: 61, users: 34 },
    { day: 'Fri', questions: 55, users: 31 },
    { day: 'Sat', questions: 42, users: 22 },
    { day: 'Sun', questions: 48, users: 26 }
  ];

  const questionCategories = [
    { name: 'Business Strategy', value: 35, color: '#3B82F6' },
    { name: 'Marketing', value: 28, color: '#10B981' },
    { name: 'Leadership', value: 20, color: '#F59E0B' },
    { name: 'Personal Growth', value: 17, color: '#EF4444' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 2400, users: 45 },
    { month: 'Feb', revenue: 3200, users: 62 },
    { month: 'Mar', revenue: 4100, users: 78 },
    { month: 'Apr', revenue: 5300, users: 95 },
    { month: 'May', revenue: 6800, users: 112 }
  ];

  // Simulate AI responses
  const simulateAIResponse = async (message) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = {
      'business strategy': "Based on my experience scaling companies, I recommend focusing on these three pillars: 1) Clear value proposition, 2) Strong customer feedback loop, 3) Scalable operations. Let me break each down for you...",
      'marketing': "Effective marketing starts with understanding your ideal customer deeply. I've found that the 80/20 rule applies here - 80% of your results come from 20% of your channels. Focus on mastering one channel first...",
      'leadership': "Great leadership isn't about having all the answers - it's about asking the right questions and empowering your team. In my coaching practice, I've seen that vulnerability and authenticity create stronger teams...",
      'revenue': "To increase revenue, look at these levers: 1) Increase customer lifetime value, 2) Reduce churn, 3) Optimize pricing strategy. From my consulting work, I've seen 30-40% revenue increases just from pricing optimization..."
    };

    const keyword = Object.keys(responses).find(key => 
      message.toLowerCase().includes(key)
    );
    
    const response = keyword ? responses[keyword] : "That's an interesting question! Based on my experience, I'd approach this by first understanding the core challenge you're facing. Could you provide more context so I can give you a more targeted response?";
    
    setIsLoading(false);
    return response;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const aiResponse = await simulateAIResponse(inputMessage);
    const aiMessage = { type: 'ai', content: aiResponse, timestamp: new Date() };
    setMessages(prev => [...prev, aiMessage]);
  };

  const StatCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}% from last week
          </p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">BrandBot AI Coach</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">John Doe's AI Coach</span>
              <Settings className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'chat', label: 'AI Chat', icon: MessageCircle },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Questions"
                value="1,247"
                change={12}
                icon={MessageCircle}
                color="bg-blue-500"
              />
              <StatCard
                title="Active Users"
                value="89"
                change={8}
                icon={Users}
                color="bg-green-500"
              />
              <StatCard
                title="Monthly Revenue"
                value="$6,800"
                change={15}
                icon={DollarSign}
                color="bg-purple-500"
              />
              <StatCard
                title="Satisfaction"
                value="4.8/5"
                change={3}
                icon={TrendingUp}
                color="bg-orange-500"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Usage Trends */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Usage Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="questions" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Question Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Question Categories</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={questionCategories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {questionCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-lg shadow-sm border h-[600px] flex flex-col">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Chat with AI Coach</h3>
              <p className="text-sm text-gray-600">Ask me anything about business, marketing, or leadership!</p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <Brain className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Start a conversation! Try asking about:</p>
                  <div className="grid grid-cols-2 gap-2 mt-4 max-w-md mx-auto">
                    <button
                      onClick={() => setInputMessage("How do I scale my business?")}
                      className="text-left p-2 bg-gray-50 rounded text-sm hover:bg-gray-100"
                    >
                      Business strategy
                    </button>
                    <button
                      onClick={() => setInputMessage("What's the best marketing approach?")}
                      className="text-left p-2 bg-gray-50 rounded text-sm hover:bg-gray-100"
                    >
                      Marketing tips
                    </button>
                    <button
                      onClick={() => setInputMessage("How can I be a better leader?")}
                      className="text-left p-2 bg-gray-50 rounded text-sm hover:bg-gray-100"
                    >
                      Leadership advice
                    </button>
                    <button
                      onClick={() => setInputMessage("How to increase revenue?")}
                      className="text-left p-2 bg-gray-50 rounded text-sm hover:bg-gray-100"
                    >
                      Revenue growth
                    </button>
                  </div>
                </div>
              )}
              
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-gray-600">Response Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">1.2s</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">73%</div>
                  <div className="text-sm text-gray-600">User Retention</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Questions</h4>
                <div className="space-y-3">
                  {[
                    "How do I scale my business effectively?",
                    "What's the best marketing strategy for startups?",
                    "How can I improve team leadership?",
                    "What are the key metrics to track?",
                    "How do I increase customer retention?"
                  ].map((question, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-700">{question}</span>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10} asks</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">User Feedback</h4>
                <div className="space-y-4">
                  {[
                    { rating: 5, comment: "Incredibly helpful insights on scaling my business!", user: "Sarah K." },
                    { rating: 5, comment: "The marketing advice was spot-on and actionable.", user: "Mike R." },
                    { rating: 4, comment: "Great leadership tips, though could use more examples.", user: "Alex T." }
                  ].map((feedback, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center mb-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">- {feedback.user}</span>
                      </div>
                      <p className="text-sm text-gray-700">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Coach Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Coach Personality
                  </label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                    <option>Professional & Authoritative</option>
                    <option>Friendly & Conversational</option>
                    <option>Direct & No-nonsense</option>
                    <option>Encouraging & Supportive</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expertise Focus Areas
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Business Strategy', 'Marketing', 'Leadership', 'Sales', 'Operations', 'Finance'].map(area => (
                      <label key={area} className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 mr-2" defaultChecked />
                        <span className="text-sm">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Response Style
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="style" className="mr-2" defaultChecked />
                      <span className="text-sm">Detailed explanations with examples</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="style" className="mr-2" />
                      <span className="text-sm">Concise, actionable advice</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="style" className="mr-2" />
                      <span className="text-sm">Socratic questioning approach</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Save Configuration
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base Management</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Content
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" className="hidden" />
                    <div className="text-gray-500">
                      <p>Drag & drop files here or click to browse</p>
                      <p className="text-sm">Supports: PDF, DOCX, TXT, MP3, MP4</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Knowledge Sources</h4>
                  <div className="space-y-2">
                    {[
                      "Business Strategy Guide.pdf",
                      "Leadership Podcast Transcripts",
                      "Marketing Case Studies",
                      "Q4 Business Review.docx"
                    ].map((source, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                        <span className="text-sm">{source}</span>
                        <button className="text-red-600 text-sm hover:text-red-800">Remove</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
