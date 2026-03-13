import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Battery, Car, TrendingUp, AlertTriangle, CheckCircle, 
  Upload, BarChart3, Clock, Activity, ArrowRight, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const Dashboard = () => {
  // Mock data
  const statsData = [
    { value: '524', label: 'Total Fleet', sublabel: '+12% this month', trend: 'up', icon: Car, color: 'primary' },
    { value: '487', label: 'Healthy Units', sublabel: '93% of fleet', trend: 'up', icon: CheckCircle, color: 'success' },
    { value: '28', label: 'Warning', sublabel: '5% of fleet', trend: 'up', icon: AlertTriangle, color: 'warning' },
    { value: '9', label: 'Critical', sublabel: '2% of fleet', trend: 'down', icon: Activity, color: 'danger' },
  ];

  const chartData = [
    { date: 'Jan 10', health: 92, soh: 88, temperature: 25 },
    { date: 'Jan 11', health: 91, soh: 87, temperature: 26 },
    { date: 'Jan 12', health: 93, soh: 89, temperature: 24 },
    { date: 'Jan 13', health: 90, soh: 86, temperature: 27 },
    { date: 'Jan 14', health: 92, soh: 88, temperature: 25 },
    { date: 'Jan 15', health: 91, soh: 87, temperature: 26 },
    { date: 'Today', health: 93, soh: 89, temperature: 24 },
  ];

  const recentPredictions = [
    { id: 'EV-1234', type: 'EV', rul: 127, status: 'Good', time: '2h ago' },
    { id: 'NV-5678', type: 'Normal', rul: 89, status: 'Good', time: '3h ago' },
    { id: 'EV-9012', type: 'EV', rul: 45, status: 'Warning', time: '5h ago' },
    { id: 'NV-3456', type: 'Normal', rul: 15, status: 'Critical', time: '1d ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'success';
      case 'Warning': return 'warning';
      case 'Critical': return 'danger';
      default: return 'gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-dark-600 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-4xl font-outfit font-bold">
                Welcome back, <span className="gradient-text">John</span>
              </h1>
              <p className="text-gray-400 mt-2">Last login: 2 hours ago</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Battery className="w-12 h-12 text-primary-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-xl flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <span className={`text-sm ${stat.trend === 'up' ? 'text-success' : 'text-danger'}`}>
                  {stat.trend === 'up' ? '↑' : '↓'} {stat.sublabel}
                </span>
              </div>
              <div className="text-4xl font-bold font-mono gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-outfit font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/predict/ev" className="glass-card p-6 card-hover group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit font-bold text-lg mb-2">Predict EV</h3>
              <p className="text-sm text-gray-400 mb-4">Battery Health Analysis</p>
              <div className="text-primary-500 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Start <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <Link to="/predict/normal" className="glass-card p-6 card-hover group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit font-bold text-lg mb-2">Predict Normal</h3>
              <p className="text-sm text-gray-400 mb-4">Vehicle Health Check</p>
              <div className="text-secondary-500 group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Start <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            <button className="glass-card p-6 card-hover group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-success to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit font-bold text-lg mb-2">Batch Upload</h3>
              <p className="text-sm text-gray-400 mb-4">Multiple Vehicles</p>
              <div className="text-success group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                Upload CSV <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <Link to="/analytics" className="glass-card p-6 card-hover group text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-warning to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-outfit font-bold text-lg mb-2">View Analytics</h3>
              <p className="text-sm text-gray-400 mb-4">Detailed Insights</p>
              <div className="text-warning group-hover:translate-x-2 transition-transform inline-flex items-center gap-2">
                View <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Fleet Health Overview Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-outfit font-bold">Fleet Health Overview</h2>
            <select className="bg-dark-500/50 border border-white/10 rounded-lg px-4 py-2 text-sm">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="sohGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E2433',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="health"
                  stroke="#00D9FF"
                  strokeWidth={2}
                  fill="url(#healthGradient)"
                  name="Health Score"
                />
                <Area
                  type="monotone"
                  dataKey="soh"
                  stroke="#6366F1"
                  strokeWidth={2}
                  fill="url(#sohGradient)"
                  name="SoH"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full" />
              <span className="text-sm text-gray-400">Health Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-secondary-500 rounded-full" />
              <span className="text-sm text-gray-400">State of Health</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-outfit font-bold">Recent Predictions</h2>
            <Link to="/history" className="text-primary-500 hover:text-primary-400 text-sm flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Vehicle ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">RUL</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Updated</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((prediction, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {prediction.type === 'EV' ? (
                          <Battery className="w-5 h-5 text-primary-500" />
                        ) : (
                          <Car className="w-5 h-5 text-secondary-500" />
                        )}
                        <span className="font-mono font-semibold">{prediction.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        prediction.type === 'EV' 
                          ? 'bg-primary-500/10 text-primary-500 border border-primary-500/30'
                          : 'bg-secondary-500/10 text-secondary-500 border border-secondary-500/30'
                      }`}>
                        {prediction.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold">{prediction.rul} days</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge-${getStatusColor(prediction.status)}`}>
                        {prediction.status === 'Good' && <CheckCircle className="w-3 h-3" />}
                        {prediction.status === 'Warning' && <AlertTriangle className="w-3 h-3" />}
                        {prediction.status === 'Critical' && <Activity className="w-3 h-3" />}
                        {prediction.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">
                      <Clock className="inline-block w-4 h-4 mr-1" />
                      {prediction.time}
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-primary-500 hover:text-primary-400 text-sm font-semibold">
                        View Details
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
