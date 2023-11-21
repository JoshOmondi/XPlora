-- Create Bookings table
-- use TOUR
CREATE TABLE Bookings (
    booking_id varchar(250) PRIMARY KEY,
    tourist_name VARCHAR(200) NOT NULL,
    tour_id INT NOT NULL,
    booking_date DATE NOT NULL,
    total_seats INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    tour_name VARCHAR(255) NOT NULL
    -- Add constraints, indexes, etc., based on your requirements
);
SELECT * FROM Bookings

-- Create an index on tour_id and booking_date for better performance
CREATE INDEX idx_tour_booking_date ON Bookings (tour_id, booking_date);
