package com.hotel.service;

import com.hotel.model.Room;
import com.hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailable(true);
    }

    public Room getRoomById(Long id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found: " + id));
    }

    public Room saveRoom(Room room) {
        return roomRepository.save(room);
    }

    public void updateAvailability(Long id, boolean available) {
        Room room = getRoomById(id);
        room.setAvailable(available);
        roomRepository.save(room);
    }
}