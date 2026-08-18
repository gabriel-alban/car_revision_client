import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { Cars } from "@/components/ui/Cars";

export default function Page() {
  return (
    <Box bg="bg.subtle" minH="100dvh">
      <Box px={{ base: "4", md: "6" }} py={{ base: "6", md: "8" }}>
        <Box maxW="7xl" mx="auto">
          <Stack gap="6">
            <Stack gap="1">
              <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
                Overview
              </Text>
            </Stack>

            <Cars />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}