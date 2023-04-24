Feature: Search

    Scenario Outline: Search
        Given an user
        When Inputing some text
            | text          |
            | <text_search> |
        And Click Search
        Then Search should load
        Examples:
            | text_search   |
            | Acklen Avenue |