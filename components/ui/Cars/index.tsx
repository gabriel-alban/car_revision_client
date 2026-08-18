"use client"

import { Fragment, useState } from "react"
import { carsQueries } from "@/queries/cars";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";

export const Cars = () => {
  const { data, isLoading, isError } = useQuery(carsQueries.useList());
  const cars = Array.isArray(data) ? data : data?.items ?? [];
  const [openCar, setOpenCar] = useState<number | null>(null);

  return (
    <Box
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      shadow="sm"
      overflow="hidden"
    >
      {isLoading ? (
        <Stack align="center" justify="center" py="12">
          <Spinner size="lg" colorPalette="blue" />
        </Stack>
      ) : isError ? (
        <Box px="5" py="8">
          <Text color="red.500">Could not load cars.</Text>
        </Box>
      ) : cars.length === 0 ? (
        <Box px="5" py="8">
          <Text color="fg.muted">No cars found.</Text>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Table.Root size="md" stickyHeader bg="bg.subtle">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader
                  textAlign="left"
                  bg="gray.100"
                  color="gray.700"
                  fontWeight="semibold"
                >
                  Brand
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="left"
                  bg="gray.100"
                  color="gray.700"
                  fontWeight="semibold"
                >
                  Model
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="left"
                  bg="gray.100"
                  color="gray.700"
                  fontWeight="semibold"
                >
                  KM Range
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {cars.map((car: any, index: number) => {
                const isOpen = openCar === index;

                return (
                  <Fragment key={`${car.brand}-${car.model}-${index}`}>
                    <Table.Row
                      onClick={() => setOpenCar(isOpen ? null : index)}
                      cursor="pointer"
                      _hover={{ bg: "gray.50" }}
                      bg={isOpen ? "gray.50" : "white"}
                    >
                      <Table.Cell>{car.brand}</Table.Cell>
                      <Table.Cell>
                        <Text fontWeight="medium">{car.model}</Text>
                      </Table.Cell>
                      <Table.Cell>{car.km_range}</Table.Cell>
                    </Table.Row>

                    {isOpen ? (
                      <Table.Row>
                        <Table.Cell colSpan={3} bg="gray.50" py="4">
                          <Stack gap="2">
                            <Text fontWeight="semibold">Additional details</Text>
                            <Text>Brand: {car.brand}</Text>
                            <Text>Model: {car.model}</Text>
                            <Text>KM Range: {car.km_range}</Text>
                          </Stack>
                        </Table.Cell>
                      </Table.Row>
                    ) : null}
                  </Fragment>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </Box>
  );
};