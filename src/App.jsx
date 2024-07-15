import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import "./App.css";
import Column from "./components/Column";
import { useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Card from "./components/Card";
import { findItem, findValueOfItems } from "./lib/helpers";

const data = [
  {
    id: "container-1",
    title: "Applied",
    addApplicants: true,
    rejected: 8,
    total: 24,
    barColor: "accent",
    candidates: [
      {
        id: "item-1",
        name: "Silvano Scally",
        location: "New York",
        rating: "4.0",
        phone: "561 682 5290",
        isNew: true,
        bar: "red",
        image: "/images/item-1.jpg",
      },
      {
        id: "item-2",
        name: "Lamar Demet",
        location: "Saint Augustine",
        rating: "5.0",
        phone: "282 645 1513",
        isNew: true,
        bar: "green",
        image: "/images/item-2.jpg",
      },
      {
        id: "item-3",
        name: "Ramsey Jantzen",
        location: "Rome",
        rating: "5.0",
        phone: "357 875 0394",
        bar: "red",
        image: "/images/item-3.jpg",
      },
      {
        id: "item-4",
        name: "Lorine Brailsford",
        location: "Warsaw",
        rating: "4.0",
        phone: "282 645 1513",
        isFollowed: true,
        bar: "yellow",
        image: "/images/item-4.jpg",
      },
    ],
  },
  {
    id: "container-2",
    title: "Shortlisted",
    rejected: 9,
    total: 16,
    barColor: "success",
    candidates: [
      {
        id: "item-5",
        name: "Lamar Demet",
        location: "Saint Augustine",
        rating: "5.0",
        phone: "350 947 8496",
        isNew: true,
        bar: "green",
        image: "/images/item-5.jpg",
      },
      {
        id: "item-6",
        name: "Torey Courtes",
        location: "Bogota",
        rating: "3.0",
        phone: "282 645 1513",
        isNew: true,
        bar: "orange",
        image: "/images/item-6.jpg",
      },
      {
        id: "item-7",
        name: "Pietra Mallinder",
        location: "San Francisco",
        rating: "4.0",
        phone: "526 481 1324",
        isFollowed: true,
        bar: "yellow",
        image: "/images/item-7.jpg",
      },
      {
        id: "item-8",
        name: "Karilynn Instonssen",
        location: "Stockholm",
        rating: "5.0",
        phone: "248 230 6575",
        bar: "green",
        image: "/images/item-8.jpg",
      },
    ],
  },
  {
    id: "container-3",
    title: "Interview",
    rejected: 1,
    total: 7,
    barColor: "danger",
    candidates: [
      {
        id: "item-9",
        name: "Davina Olkowicz",
        location: "Dongpu",
        rating: "4.0",
        phone: "214 894 2712",
        bar: "red",
        image: "/images/item-9.jpg",
      },
      {
        id: "item-10",
        name: "Ajay MacAllast",
        location: "Tokyo",
        rating: "5.0",
        phone: "754 742 7248",
        isNew: true,
        bar: "orange",
        image: "/images/item-10.jpg",
      },
      {
        id: "item-11",
        name: "Blondy Leel",
        location: "Berlin",
        rating: "4.0",
        phone: "526 481 1324",
        bar: "red",
        image: "/images/item-11.jpg",
      },
      {
        id: "item-12",
        name: "Lorine Brailsford",
        location: "Warsaw",
        rating: "4.0",
        phone: "282 645 1513",
        isFollowed: true,
        bar: "yellow",
        image: "/images/item-12.jpg",
      },
    ],
  },
];

function App() {
  const [containers, setContainers] = useState(data);
  const [activeId, setActiveId] = useState(null);

  // Dnd Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(containers, active.id, "item");
      const overContainer = findValueOfItems(containers, over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.candidates.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.candidates.findIndex(
        (item) => item.id === over.id
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].candidates = arrayMove(
          newItems[activeContainerIndex].candidates,
          activeitemIndex,
          overitemIndex
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].candidates.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].candidates.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(containers, active.id, "item");
      const overContainer = findValueOfItems(containers, over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.candidates.findIndex(
        (item) => item.id === active.id
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].candidates.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].candidates.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.

  function handleDragEnd(event) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes("container") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("item") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(containers, active.id, "item");
      const overContainer = findValueOfItems(containers, over.id, "item");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.candidates.findIndex(
        (item) => item.id === active.id
      );
      const overitemIndex = overContainer.candidates.findIndex(
        (item) => item.id === over.id
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].candidates = arrayMove(
          newItems[activeContainerIndex].candidates,
          activeitemIndex,
          overitemIndex
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].candidates.splice(
          activeitemIndex,
          1
        );
        newItems[overContainerIndex].candidates.splice(
          overitemIndex,
          0,
          removeditem
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes("item") &&
      over?.id.toString().includes("container") &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(containers, active.id, "item");
      const overContainer = findValueOfItems(containers, over.id, "container");

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.candidates.findIndex(
        (item) => item.id === active.id
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].candidates.splice(
        activeitemIndex,
        1
      );
      newItems[overContainerIndex].candidates.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }

  return (
    <main className="w-screen h-screen">
      <div className="max-w-[1400px] mx-auto grid lg:grid-cols-3 sm:grid-cols-2 gap-3 py-20 px-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          {containers.map((column) => (
            <Column key={column.id} {...column} />
          ))}
          <DragOverlay adjustScale={false}>
            {/* Drag Overlay For item */}
            {activeId && activeId.toString().includes("item") && (
              <Card id={activeId} {...findItem(containers, activeId)} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </main>
  );
}

export default App;
