#include <iostream>

struct Node {
    int data;
    Node* next;
};

inline void addToFront(Node** head, int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = *head;
    *head = newNode;
}

inline void removeFromFront(Node** head) {
    if (*head != nullptr) {
        Node* temp = *head;
        *head = (*head)->next;
        delete temp;
    }
}

inline void addToEnd(Node** head, int value) {
    Node* newNode = new Node;
    newNode->data = value;
    newNode->next = nullptr;
    
    if (*head == nullptr) {
        *head = newNode;
    } else {
        Node* current = *head;
        while (current->next != nullptr) {
            current = current->next;
        }
        current->next = newNode;
    }
}

inline void removeFromEnd(Node** head) {
    if (*head == nullptr) return;

    if ((*head)->next == nullptr) {
        delete *head;
        *head = nullptr;
    } else {
        Node* current = *head;
        while (current->next->next != nullptr) {
            current = current->next;
        }
        delete current->next;
        current->next = nullptr;
    }
}

inline Node* searchElement(Node* head, int value) {
    Node* current = head;
    while (current != nullptr) {
        if (current->data == value) {
            return current;
        }
        current = current->next;
    }
    return nullptr;
}

inline void reverseList(Node** head) {
    Node* prev = nullptr;
    Node* current = *head;
    Node* next = nullptr;
    
    while (current != nullptr) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    
    *head = prev;
}

inline void sortList(Node** head) {
    if (*head == nullptr || (*head)->next == nullptr) return;

    bool swapped;
    Node* current;
    Node* last = nullptr;

    do {
        swapped = false;
        current = *head;

        while (current->next != last) {
            if (current->data > current->next->data) {
                std::swap(current->data, current->next->data);
                swapped = true;
            }
            current = current->next;
        }
        last = current;
    } while (swapped);
}

struct DoublyNode {
    int data;
    DoublyNode* prev;
    DoublyNode* next;
};

inline DoublyNode* toTwoWayList(Node* head) {
    if (head == nullptr) return nullptr;

    DoublyNode* newHead = new DoublyNode;
    newHead->data = head->data;
    newHead->prev = nullptr;
    newHead->next = nullptr;

    DoublyNode* tail = newHead;
    Node* current = head->next;

   
   
    tail->next = newHead;
    newHead->prev = tail;

    return newHead;
}

inline void clearList(Node** head) {
    while (*head != nullptr) {
        removeFromFront(head);
    }
}

inline void printList(Node* head) {
    Node* current = head;
    while (current != nullptr) {
        std::cout << current->data << " -> ";
        current = current->next;
    }
    std::cout << "null" << std::endl;
}

int main() {
    Node* head = nullptr;

    addToFront(&head, 10);
    addToFront(&head, 20);
    addToEnd(&head, 5);
    addToEnd(&head, 15);

    std::cout << "Список після додавання елементів: ";
    printList(head);

    removeFromFront(&head);
    removeFromEnd(&head);
    removeFromEnd(&head);
    removeFromEnd(&head);
    removeFromEnd(&head);
    removeFromEnd(&head);
    removeFromEnd(&head);
    std::cout << "Список після видалення елементів: ";
    printList(head);

    Node* found = searchElement(head, 10);
    if (found != nullptr) {
        std::cout << "Знайдений елемент: " << found->data << std::endl;
    } else {
        std::cout << "Елемент не знайдено" << std::endl;
    }

    reverseList(&head);
    std::cout << "Список після перевертання: ";
    printList(head);

    sortList(&head);
    std::cout << "Список після сортування: ";
    printList(head);

    DoublyNode* twoWayList = toTwoWayList(head);
    std::cout << "Двозв'язний циклічний список створено.\n";

    clearList(&head);
    std::cout << "Список після очищення: ";
    printList(head);

    return 0;
}
