import React, { useState } from 'react';
import { FoodItem, CreateFoodData } from '../types/food';
import { FoodCard } from '../components/ui/FoodCard';
import { FoodModal } from '../components/ui/FoodModal';
import { SearchBar } from '../components/ui/SearchBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useFoods } from '../hooks/useFoods';

export default function HomePage() {
  const {
    foods,
    loading,
    error,
    searchTerm,
    actions: { handleSearch, createFood, updateFood, deleteFood },
  } = useFoods();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);

  const handleAddFood = () => {
    setEditingFood(null);
    setIsModalOpen(true);
  };

  const handleEditFood = (food: FoodItem) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const handleDeleteFood = async (id: string) => {
    if (confirm('Are you sure you want to delete this food item?')) {
      try {
        setOperationLoading(true);
        await deleteFood(id);
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete food');
      } finally {
        setOperationLoading(false);
      }
    }
  };

  const handleSubmitFood = async (data: CreateFoodData) => {
    try {
      setOperationLoading(true);
      
      if (editingFood) {
        await updateFood(editingFood.id, data);
      } else {
        await createFood(data);
      }
      
      setIsModalOpen(false);
      setEditingFood(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save food');
      throw err; // Re-throw to let form handle it
    } finally {
      setOperationLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFood(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FoodWagen
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and manage your favorite food items from various restaurants
          </p>
        </div>

        {/* Controls Section */}
        <section className="food-controls mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="flex-1 max-w-md">
              <SearchBar
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search for food items..."
              />
            </div>
            <button
              onClick={handleAddFood}
              className="food-add-btn bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              data-test-id="food-add-btn"
            >
              Add Food
            </button>
          </div>
        </section>

        {/* Content Section */}
        <section className="food-content">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="food-loading text-gray-600">
                Loading food items...
              </div>
            </div>
          ) : foods.length === 0 ? (
            <div className="empty-state-message text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                {searchTerm ? 'No food items found matching your search.' : 'No food items available.'}
              </div>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search terms.' : 'Add some delicious food to get started!'}
              </p>
            </div>
          ) : (
            <div className="food-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {foods.map((food) => (
                <FoodCard
                  key={food.id}
                  food={food}
                  onEdit={handleEditFood}
                  onDelete={handleDeleteFood}
                  isLoading={operationLoading}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <FoodModal
          food={editingFood}
          onSubmit={handleSubmitFood}
          onClose={handleCloseModal}
          isLoading={operationLoading}
        />
      )}

      <Footer />
    </div>
  );
}