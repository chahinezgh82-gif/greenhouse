 "use client"

import { useState, useEffect, useCallback } from 'react';

export interface Room {
  id: number;
  name: string;
  lightStatus: boolean;
  icon?: string;
}

const ROOMS_KEY = 'greenhouse-rooms';

const DEFAULT_ROOMS: Room[] = [
  { id: 1, name: 'Cuisine', lightStatus: false, icon: '🍳' },
  { id: 2, name: 'Chambre', lightStatus: true, icon: '🛏️' },
  { id: 3, name: 'Salon', lightStatus: false, icon: '🛋️' }
];

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setRooms(DEFAULT_ROOMS);
      return;
    }

    try {
      const saved = localStorage.getItem(ROOMS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const validatedRooms = parsed.map((r: any) => ({
          id: r.id || 0,
          name: r.name || 'Unknown',
          lightStatus: typeof r.lightStatus === 'boolean' ? r.lightStatus : false,
          icon: r.icon || ''
        })) as Room[];
        setRooms(validatedRooms);
      } else {
        setRooms(DEFAULT_ROOMS);
        localStorage.setItem(ROOMS_KEY, JSON.stringify(DEFAULT_ROOMS));
      }
    } catch (error) {
      setRooms(DEFAULT_ROOMS);
      localStorage.setItem(ROOMS_KEY, JSON.stringify(DEFAULT_ROOMS));
    }
  }, []);

  const saveRooms = useCallback((newRooms: Room[]) => {
    if (typeof window === 'undefined') return;
    try {
      setRooms(newRooms);
      localStorage.setItem(ROOMS_KEY, JSON.stringify(newRooms));
    } catch (error) {
    }
  }, []);

  const addRoom = useCallback((name: string) => {
    if (!name.trim()) return;
    const newId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    const newRoom: Room = {
      id: newId,
      name: name.trim(),
      lightStatus: false,
      icon: DEFAULT_ROOMS[(newId - 1) % DEFAULT_ROOMS.length].icon
    };
    saveRooms([...rooms, newRoom]);
  }, [rooms, saveRooms]);

  const deleteRoom = useCallback((id: number) => {
    saveRooms(rooms.filter(r => r.id !== id));
  }, [rooms, saveRooms]);

  const editRoom = useCallback((id: number, newName: string) => {
    if (!newName.trim()) return;
    saveRooms(rooms.map(r => 
      r.id === id ? { ...r, name: newName.trim() } : r
    ));
  }, [rooms, saveRooms]);

  const toggleLight = useCallback((id: number) => {
    saveRooms(rooms.map(r => 
      r.id === id ? { ...r, lightStatus: !r.lightStatus } : r
    ));
  }, [rooms, saveRooms]);

  return { 
    rooms, 
    addRoom, 
    deleteRoom, 
    editRoom, 
    toggleLight 
  };
}

