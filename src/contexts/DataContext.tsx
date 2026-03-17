import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import toast from 'react-hot-toast';

interface DataContextType {
  data: any;
  loading: boolean;
  refreshData: () => Promise<void>;
  lastUpdated: Date | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Using a placeholder URL for SheetDB. In a real app, this would be an environment variable.
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refreshData = useCallback(async () => {
    try {
      // Since we don't have a real API key yet, we'll use mock data
      // but simulate an API call structure
      const mockData = {
        courses: [
          { id: '1', title: 'Calculus I', code: 'CS101', instructor: 'Dr. Jane Smith', progress: 75, grade: 'A' },
          { id: '2', title: 'Data Structures', code: 'CS202', instructor: 'Prof. Alan Turing', progress: 40, grade: 'B+' },
          { id: '3', title: 'Modern UI Design', code: 'DS305', instructor: 'Jonathan Ive', progress: 95, grade: 'A+' },
        ],
        announcements: [
          { id: '1', title: 'Midterm Results', content: 'Results for CS101 have been posted.', date: '2023-10-25' },
          { id: '2', title: 'Campus Event', content: 'AUY Tech Summit is happening this Friday!', date: '2023-10-27' },
        ],
        schedule: [
          { id: '1', time: '09:00 AM', subject: 'Calculus I', room: 'Room 302' },
          { id: '2', time: '11:00 AM', subject: 'Data Structures', room: 'Lab 1' },
          { id: '3', time: '02:00 PM', subject: 'Modern UI Design', room: 'Studio B' },
        ]
      };
      
      setData(mockData);
      setLastUpdated(new Date());
    } catch (error) {
      toast.error('Failed to fetch data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 60000); // Poll every 60s
    return () => clearInterval(interval);
  }, [refreshData]);

  return (
    <DataContext.Provider value={{ data, loading, refreshData, lastUpdated }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};
