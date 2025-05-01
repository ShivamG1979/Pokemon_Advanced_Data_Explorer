// src/components/StatBar.jsx
function StatBar({ label, value, maxValue }) {
    const percentage = (value / maxValue) * 100;
    
    // Determine color based on stat value
    let barColor = 'bg-danger';
    if (value > maxValue * 0.7) {
      barColor = 'bg-success';
    } else if (value > maxValue * 0.4) {
      barColor = 'bg-warning';
    }
  
    return (
      <div className="stat-bar mb-2">
        <div className="d-flex justify-content-between">
          <span>{label}</span>
          <span>{value}/{maxValue}</span>
        </div>
        <div className="progress" style={{ height: '10px' }}>
          <div 
            className={`progress-bar ${barColor}`} 
            role="progressbar" 
            style={{ width: `${percentage}%` }} 
            aria-valuenow={value} 
            aria-valuemin="0" 
            aria-valuemax={maxValue}
          ></div>
        </div>
      </div>
    );
  }
  
  export default StatBar;