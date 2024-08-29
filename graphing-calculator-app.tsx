import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// GraphingCalculator component (previously created)
const GraphingCalculator = () => {
  // ... (previous implementation)
};

// New ConversionCalculator component
const ConversionCalculator = () => {
  const [value, setValue] = React.useState('');
  const [fromUnit, setFromUnit] = React.useState('km');
  const [toUnit, setToUnit] = React.useState('miles');
  const [result, setResult] = React.useState('');

  const convert = () => {
    const conversions = {
      'km-miles': 0.621371,
      'miles-km': 1.60934,
      'kg-lbs': 2.20462,
      'lbs-kg': 0.453592,
    };
    
    const conversionKey = `${fromUnit}-${toUnit}`;
    if (conversions[conversionKey]) {
      setResult((parseFloat(value) * conversions[conversionKey]).toFixed(2));
    } else {
      setResult('Invalid conversion');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Conversion Calculator</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input 
          type="number" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter value"
        />
        <div className="flex gap-4">
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km">Kilometers</SelectItem>
              <SelectItem value="miles">Miles</SelectItem>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="lbs">Pounds</SelectItem>
            </SelectContent>
          </Select>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger>
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km">Kilometers</SelectItem>
              <SelectItem value="miles">Miles</SelectItem>
              <SelectItem value="kg">Kilograms</SelectItem>
              <SelectItem value="lbs">Pounds</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={convert}>Convert</Button>
        {result && <p>Result: {result} {toUnit}</p>}
      </CardContent>
    </Card>
  );
};

// New NormalCalculator component
const NormalCalculator = () => {
  const [display, setDisplay] = React.useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        setDisplay(eval(display).toString());
      } catch (error) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Normal Calculator</h2>
      </CardHeader>
      <CardContent>
        <Input className="mb-4" value={display} readOnly />
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => (
            <Button key={btn} onClick={() => handleClick(btn)}>{btn}</Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main App component
const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-blue-500 hover:underline">Graphing Calculator</Link></li>
            <li><Link to="/conversion" className="text-blue-500 hover:underline">Conversion Calculator</Link></li>
            <li><Link to="/normal" className="text-blue-500 hover:underline">Normal Calculator</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<GraphingCalculator />} />
          <Route path="/conversion" element={<ConversionCalculator />} />
          <Route path="/normal" element={<NormalCalculator />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;