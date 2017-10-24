class CreateCheckPoints < ActiveRecord::Migration[5.1]
  def change
    create_table :check_points, id: :uuid do |t|
      t.string :name
      t.references :previous_check_point, references: :check_points, type: :uuid

      t.timestamps
    end
    add_foreign_key :check_points, :check_points, column: :previous_check_point_id
  end
end
