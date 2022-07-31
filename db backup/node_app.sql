-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2022 at 08:27 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_category`
--

CREATE TABLE `tb_category` (
  `catId` int(11) NOT NULL,
  `catName` tinytext NOT NULL,
  `rank` int(3) DEFAULT NULL,
  `storeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updateOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_category`
--

INSERT INTO `tb_category` (`catId`, `catName`, `rank`, `storeId`, `createdAt`, `updateOn`) VALUES
(1, 'Vegetables', NULL, 1, '2022-07-19 23:33:10', '2022-07-19 23:33:10'),
(2, 'Fruits', NULL, 1, '2022-07-19 23:33:18', '2022-07-19 23:33:18'),
(3, 'Diary', NULL, 1, '2022-07-19 23:33:24', '2022-07-19 23:33:24');

-- --------------------------------------------------------

--
-- Table structure for table `tb_favourite`
--

CREATE TABLE `tb_favourite` (
  `favId` int(11) NOT NULL,
  `prodId` int(11) NOT NULL,
  `cusId` int(11) NOT NULL,
  `storeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tb_product`
--

CREATE TABLE `tb_product` (
  `prodId` int(11) NOT NULL,
  `prodName` tinytext NOT NULL,
  `stockQuantity` int(11) NOT NULL DEFAULT 0,
  `sellingPrice` float(7,2) NOT NULL,
  `actualPrice` float(7,2) NOT NULL,
  `priceMargin` float NOT NULL,
  `barCode` int(11) NOT NULL,
  `storeId` int(11) DEFAULT NULL,
  `catId` int(11) DEFAULT NULL,
  `subCatId` int(11) DEFAULT NULL,
  `weight` int(11) NOT NULL,
  `quantityType` tinytext NOT NULL,
  `weightInKgs` float NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updateOn` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_product`
--

INSERT INTO `tb_product` (`prodId`, `prodName`, `stockQuantity`, `sellingPrice`, `actualPrice`, `priceMargin`, `barCode`, `storeId`, `catId`, `subCatId`, `weight`, `quantityType`, `weightInKgs`, `createdAt`, `updateOn`) VALUES
(1, 'Cabbage', 10, 25.00, 21.50, 3.5, 122, 1, 1, 1, 0, 'kg', 0, '2022-07-20 23:14:34', '2022-07-20 23:58:13'),
(2, 'Broccoli', 10, 20.00, 21.50, -1.5, 122, 1, 1, 1, 0, 'kg', 0, '2022-07-20 23:29:54', '2022-07-20 23:58:13'),
(3, 'Iceberg', 10, 35.00, 28.50, 6.5, 122, 1, 1, 1, 0, 'kg', 0, '2022-07-20 23:30:37', '2022-07-20 23:58:13'),
(4, 'Beans', 10, 35.00, 28.50, 6.5, 122, 1, 1, 2, 0, 'kg', 0, '2022-07-20 23:31:46', '2022-07-20 23:58:13'),
(5, 'Cucumbers', 10, 48.00, 38.50, 9.5, 122, 1, 1, 2, 0, 'kg', 0, '2022-07-20 23:32:04', '2022-07-20 23:58:13'),
(6, 'Mangoes', 10, 24.00, 19.50, 4.5, 122, 1, 2, 1, 0, 'kg', 0, '2022-07-20 23:35:39', '2022-07-20 23:58:13'),
(7, 'Oranges', 10, 70.00, 55.50, 14.5, 122, 1, 2, 1, 0, 'kg', 0, '2022-07-20 23:36:03', '2022-07-20 23:58:13'),
(8, 'Bananas', 10, 18.00, 15.00, 3, 122, 1, 2, 1, 0, 'kg', 0, '2022-07-20 23:38:13', '2022-07-20 23:58:13'),
(9, 'Grapes', 10, 38.00, 42.00, -4, 122, 1, 2, 1, 0, 'kg', 0, '2022-07-20 23:38:52', '2022-07-20 23:58:13'),
(10, 'Cadbury Dairy Milk Silk Pralines Classic and Dark Bars', 10, 680.00, 540.00, 140, 122, 1, 3, 6, 1, 'pcs', 1, '2022-07-20 23:51:05', '2022-07-20 23:51:05');

-- --------------------------------------------------------

--
-- Table structure for table `tb_store`
--

CREATE TABLE `tb_store` (
  `storeId` int(11) NOT NULL,
  `storeName` tinytext NOT NULL,
  `storeAddress` tinytext NOT NULL,
  `emailId` tinytext NOT NULL,
  `countryCode` tinytext NOT NULL,
  `phoneNumber` tinytext NOT NULL,
  `latitude` tinytext NOT NULL,
  `longitude` tinytext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_store`
--

INSERT INTO `tb_store` (`storeId`, `storeName`, `storeAddress`, `emailId`, `countryCode`, `phoneNumber`, `latitude`, `longitude`, `createdAt`, `updateAt`) VALUES
(1, 'McDonal', 'Jalandhar', 'info@mcdonal.co', '+91', '6239287119', '65.0615615', '35.1545184', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Dominos', 'Mumbai', 'info@domino.co', '+91', '6239287119', '72.8567', '19.2307', '0000-00-00 00:00:00', '2022-07-21 23:19:59'),
(3, 'D Mart', 'Mumbai', 'info@domino.co', '+91', '6239287119', '72.8565', '19.2305', '0000-00-00 00:00:00', '2022-07-21 23:22:03'),
(4, 'Easy Day', 'Mumbai', 'info@easy.co', '+91', '6239287119', '72.8567', '19.2307', '0000-00-00 00:00:00', '2022-07-24 22:41:17'),
(5, 'Metro', 'Mumbai', 'info@metro.co', '+91', '6239287119', '72.8567', '19.2307', '0000-00-00 00:00:00', '2022-07-24 22:43:39');

-- --------------------------------------------------------

--
-- Table structure for table `tb_subcategory`
--

CREATE TABLE `tb_subcategory` (
  `subCatId` int(11) NOT NULL,
  `subCatName` tinytext NOT NULL,
  `rank` int(3) DEFAULT NULL,
  `storeId` int(11) NOT NULL,
  `catId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_subcategory`
--

INSERT INTO `tb_subcategory` (`subCatId`, `subCatName`, `rank`, `storeId`, `catId`) VALUES
(1, 'Green Vegs', NULL, 1, 1),
(2, 'Seasonal Vegs', NULL, 1, 1),
(3, 'Seasonal Fruits', NULL, 1, 2),
(4, 'Healthy', NULL, 1, 2),
(5, 'Milk', NULL, 1, 3),
(6, 'Choco', NULL, 1, 3),
(7, 'Sweets', NULL, 1, 3),
(8, 'Gifts', NULL, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `cusId` int(5) NOT NULL,
  `firstName` tinytext NOT NULL,
  `lastName` tinytext NOT NULL,
  `emailId` tinytext NOT NULL,
  `deviceToken` tinytext NOT NULL,
  `authToken` tinytext NOT NULL,
  `phoneNumber` tinytext NOT NULL,
  `countryCode` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`cusId`, `firstName`, `lastName`, `emailId`, `deviceToken`, `authToken`, `phoneNumber`, `countryCode`) VALUES
(3, 'Mandeep', 'Singh', 'mandeep@yopmail.com', 'kbuyhg87 -41561156wqf', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXNJZCI6IjMiLCJjb3VudHJ5Q29kZSI6Iis5MSIsInBob25lTnVtYmVyIjoiNjIzOTI4NzExOSIsImRldmljZVRva2VuIjoia2J1eWhnODcgLTQxNTYxMTU2d3FmIiwiZmlyc3ROYW1lIjoiTWFuZGVlcCIsImxhc3ROYW1lIjoiU2luZ2giLCJpYXQiOjE2NTg0MjI3Mjd9.kJjBDJzM3', '6239287119', '+91');

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_session`
--

CREATE TABLE `tb_user_session` (
  `sessId` int(5) NOT NULL,
  `phoneNumber` tinytext NOT NULL,
  `countryCode` tinytext NOT NULL,
  `deviceToken` tinytext NOT NULL,
  `otpCode` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user_session`
--

INSERT INTO `tb_user_session` (`sessId`, `phoneNumber`, `countryCode`, `deviceToken`, `otpCode`) VALUES
(5, '6239287119', '+91', 'kbuyhg87 -41561156wqf', 9772);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD PRIMARY KEY (`catId`),
  ADD KEY `storeId` (`storeId`);

--
-- Indexes for table `tb_favourite`
--
ALTER TABLE `tb_favourite`
  ADD PRIMARY KEY (`favId`),
  ADD KEY `cusId` (`cusId`),
  ADD KEY `storeId` (`storeId`);

--
-- Indexes for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD PRIMARY KEY (`prodId`),
  ADD KEY `storeId` (`storeId`),
  ADD KEY `catId` (`catId`),
  ADD KEY `subCatId` (`subCatId`);

--
-- Indexes for table `tb_store`
--
ALTER TABLE `tb_store`
  ADD PRIMARY KEY (`storeId`);

--
-- Indexes for table `tb_subcategory`
--
ALTER TABLE `tb_subcategory`
  ADD PRIMARY KEY (`subCatId`),
  ADD KEY `storeId` (`storeId`),
  ADD KEY `catId` (`catId`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`cusId`);

--
-- Indexes for table `tb_user_session`
--
ALTER TABLE `tb_user_session`
  ADD PRIMARY KEY (`sessId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_category`
--
ALTER TABLE `tb_category`
  MODIFY `catId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_favourite`
--
ALTER TABLE `tb_favourite`
  MODIFY `favId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `prodId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tb_store`
--
ALTER TABLE `tb_store`
  MODIFY `storeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_subcategory`
--
ALTER TABLE `tb_subcategory`
  MODIFY `subCatId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `cusId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_user_session`
--
ALTER TABLE `tb_user_session`
  MODIFY `sessId` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD CONSTRAINT `tb_category_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `tb_store` (`storeId`);

--
-- Constraints for table `tb_favourite`
--
ALTER TABLE `tb_favourite`
  ADD CONSTRAINT `tb_favourite_ibfk_1` FOREIGN KEY (`cusId`) REFERENCES `tb_users` (`cusId`),
  ADD CONSTRAINT `tb_favourite_ibfk_2` FOREIGN KEY (`storeId`) REFERENCES `tb_store` (`storeId`);

--
-- Constraints for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD CONSTRAINT `tb_product_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `tb_store` (`storeId`),
  ADD CONSTRAINT `tb_product_ibfk_2` FOREIGN KEY (`catId`) REFERENCES `tb_category` (`catId`),
  ADD CONSTRAINT `tb_product_ibfk_3` FOREIGN KEY (`subCatId`) REFERENCES `tb_subcategory` (`subCatId`);

--
-- Constraints for table `tb_subcategory`
--
ALTER TABLE `tb_subcategory`
  ADD CONSTRAINT `tb_subcategory_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `tb_store` (`storeId`),
  ADD CONSTRAINT `tb_subcategory_ibfk_2` FOREIGN KEY (`catId`) REFERENCES `tb_category` (`catId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
