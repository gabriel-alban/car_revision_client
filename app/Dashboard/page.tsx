import { Box, Stack, Text } from "@chakra-ui/react";
import { Cars } from "@/components/ui/Cars";
import { Modal } from "@/components/ui/Modal";

export default function Page() {
    return (
        <Box bg="bg.subtle" minH="100dvh">
            <Box px={{ base: "4", md: "6" }} py={{ base: "6", md: "8" }}>
                <Box maxW="7xl" mx="auto">
                    <Stack gap="6">
                        <Stack gap="1">
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text fontSize="sm" fontWeight="semibold" color="fg.muted">
                                    Overview
                                </Text>
                                <Modal triggerName="New Car">
                                    <div>Content</div>
                                </Modal>
                            </div>
                        </Stack>
                        <Cars />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}