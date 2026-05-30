package com.hotel.service;

import com.hotel.model.*;
import com.hotel.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingRepository bookingRepository;
    private final RoomService roomService;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    public Booking createBooking(Booking booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId());
        long nights = ChronoUnit.DAYS.between(booking.getCheckIn(), booking.getCheckOut());
        booking.setTotalPrice(nights * room.getPrice());
        booking.setRoom(room);
        roomService.updateAvailability(room.getId(), false);
        return bookingRepository.save(booking);
    }

    public Booking cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found: " + id));
        booking.setStatus("CANCELLED");
        roomService.updateAvailability(booking.getRoom().getId(), true);
        return bookingRepository.save(booking);
    }
}