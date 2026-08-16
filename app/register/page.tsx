"use client"

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"
import {
    Alert,
    Box,
    Button,
    chakra,
    Field,
    Heading,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react"

export default function RegisterPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            })

            const data = await response.json().catch(() => ({}))

            if (!response.ok) {
                setError(data.message ?? "Unable to create account")
                return
            }

            router.push("/login")
            router.refresh()
        } catch {
            setError("Unable to reach the registration service")
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <Box
            minH="100dvh"
            bg="bg.subtle"
            display="grid"
            placeItems="center"
            px={{ base: "4", md: "6" }}
            py="8"
        >
            <Box
                as="main"
                w="full"
                maxW="sm"
                bg="bg.panel"
                borderWidth="1px"
                borderColor="border.subtle"
                borderRadius="lg"
                p={{ base: "6", md: "8" }}
                shadow="sm"
            >
                <Stack gap="6">
                    <Stack gap="1">
                        <Heading size="lg">Create account</Heading>
                        <Text color="fg.muted">Enter your details to get started.</Text>
                    </Stack>

                    <chakra.form onSubmit={onSubmit} suppressHydrationWarning>
                        <Stack gap="4">
                            <Field.Root required disabled={isSubmitting}>
                                <Field.Label>Username</Field.Label>
                                <Input
                                    type="text"
                                    placeholder="johndoe"
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                />
                            </Field.Root>

                            <Field.Root required disabled={isSubmitting}>
                                <Field.Label>Email address</Field.Label>
                                <Input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </Field.Root>

                            <Field.Root required disabled={isSubmitting}>
                                <Field.Label>Password</Field.Label>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </Field.Root>

                            {error ? (
                                <Alert.Root status="error">
                                    <Alert.Indicator />
                                    <Alert.Content>
                                        <Alert.Title>Unable to create account</Alert.Title>
                                        <Alert.Description>{error}</Alert.Description>
                                    </Alert.Content>
                                </Alert.Root>
                            ) : null}

                            <Button
                                type="submit"
                                colorPalette="blue"
                                loading={isSubmitting}
                                loadingText="Creating account"
                                w="full"
                            >
                                Create account
                            </Button>
                        </Stack>
                    </chakra.form>
                </Stack>
            </Box>
        </Box>
    )
}
