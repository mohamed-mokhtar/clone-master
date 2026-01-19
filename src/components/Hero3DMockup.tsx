import { motion } from 'framer-motion';
import { CreditCard, TrendingUp, Shield, Percent } from 'lucide-react';

export const Hero3DMockup = () => {
  return (
    <motion.div 
      className="relative w-full max-w-[400px] h-[500px] mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Phone Frame */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-card via-card to-muted rounded-[3rem] shadow-float border border-border/50 overflow-hidden"
        animate={{ 
          rotateY: [0, 5, 0, -5, 0],
          rotateX: [0, -3, 0, 3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        {/* Screen Content */}
        <div className="absolute inset-3 bg-gradient-to-b from-background to-muted rounded-[2.5rem] overflow-hidden">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-3 bg-card/50">
            <span className="text-xs text-muted-foreground">9:41</span>
            <div className="flex gap-1">
              <div className="w-4 h-2 bg-primary rounded-sm"></div>
              <div className="w-4 h-2 bg-muted-foreground/30 rounded-sm"></div>
            </div>
          </div>

          {/* App Header */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Welcome back</p>
                <p className="font-semibold text-foreground text-sm">FinMart</p>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <motion.div 
            className="mx-4 p-5 bg-gradient-to-br from-primary via-primary to-primary-dark rounded-2xl text-primary-foreground shadow-elegant"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <p className="text-xs opacity-80">Total Balance</p>
            <p className="text-2xl font-bold mt-1">AED 124,500</p>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-xs opacity-70">Income</p>
                <p className="text-sm font-semibold text-green-300">+12.5%</p>
              </div>
              <div>
                <p className="text-xs opacity-70">Savings</p>
                <p className="text-sm font-semibold">AED 45K</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-2 px-4 mt-4">
            {[
              { icon: TrendingUp, label: 'Invest' },
              { icon: CreditCard, label: 'Cards' },
              { icon: Shield, label: 'Secure' },
              { icon: Percent, label: 'Loans' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center gap-1 p-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Recent Transactions */}
          <div className="px-4 mt-4">
            <p className="text-xs font-semibold text-foreground mb-2">Recent</p>
            {[
              { name: 'Emirates NBD', amount: '-AED 2,500', type: 'Loan EMI' },
              { name: 'Salary', amount: '+AED 15,000', type: 'Credit' },
            ].map((tx, i) => (
              <motion.div
                key={i}
                className="flex justify-between items-center py-2 border-b border-border/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div>
                  <p className="text-xs font-medium text-foreground">{tx.name}</p>
                  <p className="text-[10px] text-muted-foreground">{tx.type}</p>
                </div>
                <p className={`text-xs font-semibold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-foreground'}`}>
                  {tx.amount}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-background rounded-full"></div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-2xl shadow-gold flex items-center justify-center"
        animate={{ 
          y: [-10, 10, -10],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Percent className="w-8 h-8 text-white" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-xl shadow-elegant flex items-center justify-center"
        animate={{ 
          y: [10, -10, 10],
          rotate: [0, -5, 0, 5, 0]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Shield className="w-6 h-6 text-white" />
      </motion.div>

      <motion.div
        className="absolute top-1/3 -left-8 w-14 h-14 bg-gradient-to-br from-accent to-secondary rounded-lg shadow-soft flex items-center justify-center"
        animate={{ 
          x: [-5, 5, -5],
          y: [5, -5, 5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <TrendingUp className="w-5 h-5 text-white" />
      </motion.div>
    </motion.div>
  );
};
