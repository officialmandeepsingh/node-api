-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 15, 2022 at 03:28 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `tb_cus_address`
--

CREATE TABLE `tb_cus_address` (
  `cusAddressId` int(11) NOT NULL,
  `cusId` int(5) NOT NULL,
  `address` tinytext NOT NULL,
  `addressType` int(1) NOT NULL,
  `latitude` tinytext NOT NULL,
  `longitude` tinytext NOT NULL,
  `landmark` tinytext NOT NULL,
  `country` tinytext NOT NULL,
  `pincode` tinytext NOT NULL,
  `addressName` tinytext NOT NULL,
  `isDefault` int(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updateAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `isFreeDeliveryEnable` int(1) NOT NULL DEFAULT 0,
  `weight` float NOT NULL,
  `deliveryRadius` int(3) NOT NULL,
  `baseDeliveryCharges` float NOT NULL,
  `weightPerKg` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updateAt` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `authToken` text NOT NULL,
  `phoneNumber` tinytext NOT NULL,
  `countryCode` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD PRIMARY KEY (`catId`),
  ADD KEY `storeId` (`storeId`);

--
-- Indexes for table `tb_cus_address`
--
ALTER TABLE `tb_cus_address`
  ADD PRIMARY KEY (`cusAddressId`),
  ADD KEY `FK_cusId` (`cusId`);

--
-- Indexes for table `tb_favourite`
--
ALTER TABLE `tb_favourite`
  ADD PRIMARY KEY (`favId`),
  ADD UNIQUE KEY `prodId_cusId_storeId` (`prodId`,`cusId`,`storeId`),
  ADD KEY `tb_favourite_ibfk_1` (`cusId`),
  ADD KEY `tb_favourite_ibfk_2` (`storeId`);

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
  MODIFY `catId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_cus_address`
--
ALTER TABLE `tb_cus_address`
  MODIFY `cusAddressId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_favourite`
--
ALTER TABLE `tb_favourite`
  MODIFY `favId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `prodId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_store`
--
ALTER TABLE `tb_store`
  MODIFY `storeId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_subcategory`
--
ALTER TABLE `tb_subcategory`
  MODIFY `subCatId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `cusId` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_user_session`
--
ALTER TABLE `tb_user_session`
  MODIFY `sessId` int(5) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD CONSTRAINT `tb_category_ibfk_1` FOREIGN KEY (`storeId`) REFERENCES `tb_store` (`storeId`);

--
-- Constraints for table `tb_cus_address`
--
ALTER TABLE `tb_cus_address`
  ADD CONSTRAINT `FK_cusId` FOREIGN KEY (`cusId`) REFERENCES `tb_users` (`cusId`);

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
